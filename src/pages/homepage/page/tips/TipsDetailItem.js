import { useState, useEffect } from "react";
import TipsServices from "../../../../apis/TipsServices";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router";
import TipsDetailItemMain from "./TipsDetailItemMain";
import {Route} from "react-router-dom";

export default function TipsDetailItem() {
  const { id } = useParams();
  const [tips, setTips] = useState();
  const [anotherTips, setAnotherTips] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    getTipsById(id);
    // getTipsAnotherById(id);
  }, [id]);

  const getTipsById = (id) => {
    TipsServices.getTipsById(id)
      .then((response) => {
        console.log(response.data);
        setTips(response.data);
      })
      .catch((e) => {
        alert(e);
      });

    let params = { name: null, pageNumber: 0, pageSize: 6 };
    TipsServices.getAllTips_Page(params)
      .then((response) => {
        let temp = response.data.tips;
        let fil = temp.map((data) => {
          if (data.tipsId !== id && data !== undefined) return data;
        });
        // console.log(fil);
        setAnotherTips(fil);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const getTipsAnotherById = (id) => {
    const params = { name: null, pageNumber: 0, pageSize: 6 };
    TipsServices.getAllTips_Page(params)
      .then((response) => {
        let temp = response.data.tips;
        let fil = temp.map((data) => {
          if (data.tipsId !== id && data !== undefined) return data;
        });
        console.log(fil);
        setAnotherTips(fil);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    //   https://www.skillshare.com/browse/cooking
    <div>
      <Navbar isActive={true} />
      {tips ? (
        <TipsDetailItemMain tips={tips} anotherTips={anotherTips} />
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
}
