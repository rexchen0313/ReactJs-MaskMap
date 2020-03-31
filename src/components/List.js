import React from "react";
import Item from "./Item";

const List = ({datas, style, onClick}) => (
    <div id="list" style={style}>
        {datas && datas.map((data) => (
            <Item key={data.id} data={data} onClick={()=>{onClick(data.id)}}/>
        ))}
    </div>
);

export default List;