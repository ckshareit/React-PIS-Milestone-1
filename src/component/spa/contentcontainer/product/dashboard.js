import React from 'react';
import {Bar} from 'react-chartjs-2';
import axios from "axios";
import { Link } from 'react-router-dom';
import AddProduct from './addproduct';
import DeleteProduct from './deleteproduct';
import UpdateProduct from './updateproduct';
import AllProducts from './allproducts';
import ProductDetail from './productdetail';


import '../../../../main.css';
import { getDefaultNormalizer } from '@testing-library/react';



class Dashboard extends React.Component {

    constructor(props){
        super(props)
        this.state={
          products:[],
       
            
        }
    }

   
    componentWillMount(){
      this.getAllProducts()
  }
 
getAllProducts=()=>{
  axios.get('http://localhost:3006/products')
          .then(response=>{
              console.log(response);
              console.log(response.data)
              this.setState({products: response.data})
             
              console.log(this.state.products);
          }, error=>{
              console.error(error);
          })

          
}

getLebels=()=>{
  
  return this.state.products.map(product=>{
    return(
      product.ProductName
    )
})
}

getStockData=()=>{
  return this.state.products.map(product=>{

    
    return(
      product.stock
    )
})
}

prepareStockData=()=>{
  var stockDataGather =[];

stockDataGather.push(this.getStockData());

return stockDataGather;
}

  prepareData=()=>{

    
    return ({
      labels: this.getLebels(),
     
      datasets: [
        {
          label: 'Product',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: this.getStockData()
        }
      ]
    })
  }

  

    render() { 
        return (  
      
           <div>
          <section class="aflogin">
  <nav class="dashnav">
   
    <h1 class="h1dash">DashBoard</h1>
    
    <br></br><br></br>
      <button class="btndashselect">Dashboard</button>
      <br></br><br></br>
      <Link to='/addproduct'><button class="btndash">Add Product</button></Link>
      <br></br><br></br>
      <Link to='/products'><button class="btndash">View Products</button></Link>
      <br></br><br></br>
      <Link to='/'><button class="btndash">LogOut</button></Link>
  </nav>
  
  <article>
<div class="divgraph">
    <Bar
          data={this.prepareData}
          options={{
            title:{
              display:true,
              text:'Stock Monitoring',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </div>
  </article>
</section>
        
            </div>
        )
    }

}

export default Dashboard;