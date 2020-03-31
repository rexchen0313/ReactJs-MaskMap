import React from 'react';

const SearchBar = ({handleOnSubmit}) => {
  return (
    <div style={{background:'#f2f9fd', height:'90px',padding:'0 15px'}}>
      <div style={{height:'40px',lineHeight:'40px'}}>搜尋地址:</div>
      <form onSubmit={(e) => handleOnSubmit(e)} style={{width:'100%',height:'30px'}}>
        <input type="text" placeholder="請填入地址" style={{width:'80%', height:'100%', padding:'0 8px'}}/>
        <input type="submit" value="submit" style={{width:'20%', height:'100%'}}/>
      </form>
    </div>
  );
};
export default SearchBar;