import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Details = () => {
    const {id} = useParams("");
    console.log(id);
    const [userDatas, setuserDatas] = useState([]);
    const DetailsInd = async () => {
       
        try {
            const res = await fetch(`/viewss/${id}`, {

                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                  credentials: "include"
            });
            const data = await res.json();
            // console.log(data);
            setuserDatas(data);
            // console.log(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        DetailsInd();
    }, [])


    return (
        <>  <p>Individaul data</p>
        <div>name : {userDatas.name}</div>
            <div>email : {userDatas.email}</div>
            <div>work : {userDatas.work}</div>
            <div>photo : {userDatas.photo}</div>
            </>

    )
}

export default Details