import React from 'react'

const Item = ({data, onClick}) => (
  <div style={{padding:'0px 10px',width:'100%',cursor:'pointer'}} onClick={onClick}>
		<h3 style={{fontSize:'18px',margin:'10px 0'}}>{data.name}</h3>
    <p style={{fontSize:'14px',color:'#666666',margin:'5px 0'}}>地址 : {data.address}</p>
    <p style={{fontSize:'14px',color:'#666666',margin:'5px 0'}}>電話 : {data.phone}</p>
		<p style={{fontSize:'14px',color:'#666666',margin:'5px 0'}}>更新時間 : {data.updated}</p>
    <div style={{background:'#fff',width:'100%',height:'30px',margin:'10px 0 '}}>
      <div style={{width:'50%',float:'left'}}>
				<div style={{background:'#73C0D8',width:'90%',height:'30px',lineHeight:'30px',borderRadius:'8px', textAlign:'center',fontSize:'14px'}}>
					<div style={{color:'#fff',float:'left',margin:'0 15px'}}>成人</div>
					<div style={{color:'#fff',float:'right',margin:'0 15px'}}>{data.mask.adult}</div>
				</div>
			</div>
      <div style={{width:'50%',float:'right'}}>
				<div style={{background:'#FFA573',width:'90%',height:'30px',lineHeight:'30px',borderRadius:'8px', textAlign:'center',fontSize:'14px'}}>
					<div style={{color:'#fff',float:'left',margin:'0 15px'}}>兒童</div>
					<div style={{color:'#fff',float:'right',margin:'0 15px'}}>{data.mask.child}</div>
				</div>
			</div>
    </div>
		<hr/>
  </div>
)

export default Item;