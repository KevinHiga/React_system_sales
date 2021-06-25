import React, {  useEffect } from "react";
import './styles/Dialog.css';

const DashboardPage = () => {
  useEffect(() => {
    (async () => {
      const requestOptions = {
        headers: { 
          "Content-Type": "application/json", 
          "accept": "application/json",
          "doktuz_apikey": "tokMckxPFKPTU1lBrd0WTpuzdXaJqz8GXog",
          "Access-Control-Request-Headers": "X-Requested-With, Origin, Content-Type, Accept, Authorization, doktuz_apikey"
        },
        mode: "cors",
      };
      fetch("https://devapi.doktuz.com/goambu/api/v2/helpdesk/mediweb/synch-by-attentionid?attention_id=138154", requestOptions)
        .then((res) => res)
        .then((data2) => {
          console.log(data2);
        });
    })();
  }, []);
  return (
    <div>
    </div>
  );
};

export default DashboardPage;
