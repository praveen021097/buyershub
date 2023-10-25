import React, { useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Redux/ProductReducer/action';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import ReactStars from "react-rating-stars-component";
import ReviewCard from '../../components/ReviewCard/ReviewCard';
const options ={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value: 2.5,
    isHalf:true
}
const ProductDetails = () => {
    const {isLoading, products} = useSelector((state)=>state.ProductReducer);
    const dispatch = useDispatch();
    const {id} = useParams()
    const [currentProduct ,setCurrentProduct] = useState({});
    useEffect(()=>{
            if(products?.length === 0){
                    dispatch(getProducts)
            }
    },[dispatch,products?.length])

    useEffect(()=>{
        if(id){
            const currentPro = products && products.find((el)=>el._id === id);
            currentPro && setCurrentProduct(currentPro);
        }
    },[id,setCurrentProduct])
    console.log("current",currentProduct)
  return (
    <>
    <div className={styles.productDetails}>
            <div className={styles.imageDiv}>
                <Carousel className={styles.Carousel} >
                    {
                        currentProduct.images && currentProduct.images.map((item,i)=>(<img src={item.url} alt={item.url} key={i} className={styles.CarouselImage} />))
                    }
                </Carousel>
            </div>
            <div>
                <div className={styles.detailsBlock1}>
                        <h2>{currentProduct.name}</h2>
                        <p>Product #{currentProduct._id}</p>
                </div>
                <div className={styles.detailsBlock2}>
                        <ReactStars {...options} />
                        <span>({currentProduct.numOfReviews} Reviews)</span>
                </div>
                <div className={styles.detailsBlock3}>
                        <h1>{`₹${currentProduct.price}`}</h1>
                        <div className={styles.detailsBlock31}>
                            <div className={styles.detailsBlock311}>
                                <button>-</button>
                                <input type="number" value={"1"} />
                                <button>+</button>
                            </div>
                            <button>Add To Cart</button>
                        </div>
                        <p>
                            Status:
                            <b className={currentProduct.Stock<1? styles.redColor:styles.greenColor}>
                                {currentProduct.Stock<1?"OutOfStock":"InStock"}
                            </b>
                        </p>
                </div>
                <div className={styles.detailsBlock4}>
                    Description : <p>{currentProduct.description}</p>
                </div>
                <button className={styles.submitReview}>Submit Review</button>
            </div>
    </div>
    <h3 className={styles.reviewsHeading}>REVIEWS</h3>
    {
        currentProduct.reviews && currentProduct.reviews[0]?(
            <div className={styles.reviews}>
                    {
                         currentProduct.reviews && currentProduct.reviews.map((review)=><ReviewCard  review={review} />)
                    }
                    
            </div>
        ):(
            <div>No Reviews Yet</div>
        )
    }
    </>
  )
}

export default ProductDetails