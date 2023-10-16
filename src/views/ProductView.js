import { Link, useParams } from "react-router-dom";
import { useState, useEffedct } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from "../lib/db";
import Layout from "../components/Layout";


const ProductView = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        id: ""
    });
    const [productIdList, setProductIdList] = useState([]);

    useEffedct(() => {
        // 畫面渲染完成後自動觸發
        console.log("Ready to get productId:", productId);
        fetchData();
    }, []);

    const fetchData = async() => {
        const productDoc = await getDoc(doc(db, "productList", productId));
        const productList = await getDocs(collection(db, "productList"));
        const productIdList = [];
        productList.forEach(doc => {
            productIdList.push(doc.id);
        })
        const product = productDoc.data();
        product.id = productDoc.id;
        setProduct(product);
        setProductIdList(productIdList);
    };

    const productLinks = productIdList.map(productId => <Link key={productId} to={`/product/${productId}`} className="ms-2">{productId}</Link>);
    
    return (
        <Layout title={product.name} bg={`https://picsum.photos/id/${product.id * 10}/1920/1080`}>
            <div className="conatain py-5">
                <h1>Product Name: {product.name}</h1>
                <h3>Product Price: {product.price}</h3>
                <div className="mt-3">
                    <Link to="/">Back</Link>
                    {productLinks}
                </div>
            </div>
        </Layout>
    )
};

export default ProductView;