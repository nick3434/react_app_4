import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import db from "../lib/db"

const HomeView = () => {
    // 只要state被改變，畫面就會重新渲染
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        // 此流程會在畫面渲染後被執行
        console.log("畫面渲染完成，準備執行副作用")
        // 相當於 componentWillMount
        fetchProductList();
    }, [])
    // 陣列內的資料若有被更新才有side effect

    const fetchProductList = async () => {
        console.log("=======準備去後端撈取資料=======");
        const productDocList = await getDocs(collection(db, "productList"));
        const newProductList = [];
        productDocList.forEach(doc => {
            const product = doc.data();
            product.id = doc.id;
            newProductList.push(product);
        });
        console.log(newProductList);
        setProductList(newProductList);
        console.log("=======撈取資料完畢=======");
    };

    const productListElement = productList.map(product => {
        return (
            <div className="col-md-4" key={product.id}>
                <ProductCard product={product} />
            </div>
        )
    });

    return (
        <Layout title="Product List">
            <div className="containe">
                <h1>Home View</h1>
                <Link to="/about" className="btn btn-primary">Go About page</Link>
                <div className="row mt-4">
                    {productListElement}
                </div>
            </div>
        </Layout>
    )
}

export default HomeView;