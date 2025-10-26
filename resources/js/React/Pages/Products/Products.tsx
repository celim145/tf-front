
import ProductList from "@app/js/React/components/ProductList/ProductList";
import ProductCreateForm from "@app/js/React/components/ProductCreateForm/ProductCreateForm";
import { useEffect, useState, useRef } from "react";
import { ProductModel } from "@app/js/app.types";
import productListApi from "@app/js/services/api/productListApi";
import Pagination from "@app/js/React/components/Pagination/Pagination";

interface ProductsResponse {
    rows: ProductModel[];
    count: number;
}

export default function Products() {
    const [productList, setProductList] = useState<ProductModel[] | "error">();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const searchTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        listApi(currentPage);
    }, [currentPage]);

    useEffect(() => {
        // Se houver um timer agendado, cancela para evitar buscas desnecessárias.
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Define um novo timeout para executar a busca após 500ms
        searchTimeoutRef.current = window.setTimeout(() => {
            setCurrentPage(1); // Reseta para a primeira página ao buscar
            listApi(1, searchQuery);
        }, 500);

        // Função de limpeza que cancela o timeout se o componente for desmontado
        return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current) };
    }, [searchQuery]);

    const listApi = async (page: number, search: string = searchQuery) => {
        const resp = await productListApi(10, page, search) as ProductsResponse;
        // Verifica se a resposta da API é inválida ou contém um erro.
        // Isso previne erros caso `resp` seja undefined ou null.
        if (!resp || "error" in resp) {
            setProductList("error");
            return;
        }
        setProductList(resp.rows);
        setTotalPages(Math.ceil(resp.count / 10));
    };

    const createProductHandler = () => {
        listApi(currentPage);
    }

    const deleteProductHandler = () => {
        listApi(currentPage);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="row g-4">
            <ProductCreateForm onCreate={createProductHandler} />
            
            <div className="col-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <ProductList products={productList} onDelete={deleteProductHandler} />
            
            {productList && productList !== "error" && (
                <div className="col-12">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}
