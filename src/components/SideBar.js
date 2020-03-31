import React from "react";
import SearchBar from "./SearchBar";
import List from './List';

const SideBar = ({handleOnSubmit, setMapCenter, datas, style}) => (
    <div style={style}>
        <SearchBar handleOnSubmit={handleOnSubmit}/>
        <List datas={datas} style={{height:'calc(100% - 90px)', overflow:'auto'}} onClick={setMapCenter}/>
    </div>
);

export default SideBar;