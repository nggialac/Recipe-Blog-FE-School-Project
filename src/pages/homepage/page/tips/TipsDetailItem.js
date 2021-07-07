import { useState, useEffect } from "react";
import TipsServices from '../../../../apis/TipsServices';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router";
import TipsDetailItemMain from "./TipsDetailItemMain";

export default function TipsDetailItem() {
    const { id } = useParams();
    const [tips, setTips] = useState();
  
    useEffect(() => {
        getTipsById(id);
    }, []);
  
    const getTipsById = (id) => {
      TipsServices.getTipsById(id)
        .then((response) => {
          console.log(response.data);
          setTips(response.data);
        })
        .catch((e) => {
          alert(e);
        });
    };
    return (
      //   https://www.skillshare.com/browse/cooking
      <div>
        <Navbar isActive={true} />
        <TipsDetailItemMain tips={tips} />
        <Footer />
      </div>
    );
}
