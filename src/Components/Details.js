import React,{ useState, useEffect } from 'react';
import { Card, Col, Row,Input   } from 'antd';
import 'antd/dist/antd.css';


const { Meta } = Card;
const { Search } = Input;

function Details (){
  const style = { background: '#0092ff', padding: '8px 0' };
    const [beerData , setbeerData] = useState("");
    const[imageUrl,setImageUrl] =useState("");
    const[data,setData]=useState("");
    const API_URL = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json';
    const IMAGE_URL ='https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json'
    useEffect(() => {
      loadData();
      loadImage();
      
    
    },[]);
      //function to make API Call
    const loadData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      if(data){
        setbeerData(data);
        setData(data);
        
      }
    }
    const loadImage= async () => {
      const response = await fetch(IMAGE_URL);
      const urls = await response.json();
      if(urls){
        setImageUrl(urls);
        console.log(urls);
      }
    }

    
    
    //SearchFunction

    const searchfunc = (e)=>{
      const results = data.filter(name =>
        name.name.toLowerCase().includes(e.target.value)
      );
      setbeerData(results);
      }
return(
  <>
  
<Search
      placeholder="Search By Name"
      onChange={ e => searchfunc(e)}
      style={{ width: 500 , margin:40}}
    />

  { beerData.length>0 &&
    

    <div className="site-card-wrapper">
          <Row gutter={16}>
        { beerData.map((beerData)=>(

  <Col className="gutter-row" span={6}>
    {imageUrl.length>0 && 
    
    <Card
    hoverable
    style={{ width: 240 , marign: 10}}
    cover={<img alt="example" style={{ height: 240 }} src={imageUrl[Math.floor(Math.random() * (4 - 0 + 1)) + 0].image} />}
    key={beerData.id}
  >
    <Meta title={beerData.name} description={beerData.style} />
  </Card>
    }
  
  </Col>

))

    }
      </Row>
    </div>

}

   </>

)

}
export default Details;