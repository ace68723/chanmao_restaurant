

登陆API

   Tables 	                   说明                   	默认值 
    URL   	http://www.chanmao.ca/index.php?r=rrclient/login/	    
  HTTP请求方式	                  POST                  	    
   是否需要登录 	                   是                    	    
   授权访问限制 	                   暂无                   	    
   授权范围() 	                   暂无                   	    
    支持格式  	                  JSON                  	    

表头参数:

  Tables	类型及其范围	说明  	默认值 
  暂无    	      	    	    

请求字段：

  Tables  	类型及其范围	说明  	默认值    
  name    	string	用户名 	       
  password	string	密码  	       
  channel 	number	访问渠道	4（pos机）
  version 	string	应用版本	"1.0.9"





返回字段说明:

  Tables    	类型及其范围	说明    	默认值       
  ev_error  	number	请求是否成功	0为成功, 1为错误
  ev_message	string	报错信息  	空         
  ev_oid    	string	下单ID  	空         



获取订单列表

   Tables 	                   说明                   	默认值 
    URL   	http://www.chanmao.ca/index.php?r=rrclient/billing/	    
  HTTP请求方式	                  POST                  	    
   是否需要登录 	                   是                    	    
   授权访问限制 	                   暂无                   	    
   授权范围() 	                   暂无                   	    
    支持格式  	                  JSON                  	    

表头参数:

  Tables	类型及其范围	说明  	默认值 
  暂无    	      	    	    

请求字段：

  Tables	类型及其范围	说明     	默认值 
  token 	string	token验证	    
  rid   	string	餐馆ID   	4   





返回字段说明:

  Tables    	类型及其范围	说明    	默认值       
  result    	number	请求是否成功	0为成功, 1为错误
  ev_message	string	报错信息  	空         
  bills     	array 	账单列表  	          

  bills          	类型及其范围	说明        	默认值 
  bid            	string	账单ID      	    
  bid_range_start	string	账单起始日期    	    
  bid_range_end  	string	账单截止日期    	    
  total_income   	string	账单总金额     	    
  service_charge 	string	服务费金额     	    
  bill           	string	账单净额（除服务费）	    



订单详情

   Tables 	                   说明                   	默认值 
    URL   	http://www.chanmao.ca/index.php?r=rrclient/orderdetail/	    
  HTTP请求方式	                  POST                  	    
   是否需要登录 	                   是                    	    
   授权访问限制 	                   暂无                   	    
   授权范围() 	                   暂无                   	    
    支持格式  	                  JSON                  	    

表头参数:

  Tables	类型及其范围	说明  	默认值 
  暂无    	      	    	    

请求字段：

  Tables	类型及其范围	说明     	默认值 
  token 	string	token验证	    
  rid   	string	餐馆ID   	4   
  oid   	string	订单编号   	    





返回字段说明:

  Tables   	类型及其范围	说明        	默认值       
  result   	number	请求是否成功    	0为成功, 1为错误
  error_msg	string	报错信息      	空         
  oid      	string	订单编号      	          
  dltype   	number	自取/配送/超出范围	          
  total    	number	订单金额      	          
  comment  	string	订单备注      	          
  tel      	string	联系电话      	          
  name     	string	客户姓名      	          
  items    	array 	菜品列表      	          

  items  	类型及其范围	说明        	默认值 
  int_no  	string	菜品ID      	    
  int_no 	string	菜品编号      	AXX 
  otid   	string	菜品在全部订单中编号	    
  ds_name	string	菜品名称      	    
  ds_desc	string	菜品描述      	    
  amount 	string	菜品数量      	    



地区确认API

   Tables 	                   说明                   	默认值 
    URL   	http://www.chanmao.ca/index.php?r=rrclient/areacheck/	    
  HTTP请求方式	                  POST                  	    
   是否需要登录 	                   是                    	    
   授权访问限制 	                   暂无                   	    
   授权范围() 	                   暂无                   	    
    支持格式  	                  JSON                  	    

表头参数:

  Tables	类型及其范围	说明  	默认值 
  暂无    	      	    	    

请求字段：

  Tables	类型及其范围	说明     	默认值 
  token 	string	token验证	    
  rid   	string	餐馆ID   	    
  lat   	string	客户位置纬度 	    
  lng   	string	客户位置精度 	    





返回字段说明:

  Tables   	类型及其范围	说明              	默认值       
  result   	number	请求是否成功          	0为成功, 1为错误
  error_msg	string	报错信息            	空         
  dlexp    	number	delivery expense	空         
  area     	number	客户所处区域          	          



订单查询API（流水汇总）

   Tables 	                   说明                   	默认值 
    URL   	http://www.chanmao.ca/cm-rrclient/www/#/tab/summary	    
  HTTP请求方式	                  POST                  	    
   是否需要登录 	                   是                    	    
   授权访问限制 	                   暂无                   	    
   授权范围() 	                   暂无                   	    
    支持格式  	                  JSON                  	    

表头参数:

  Tables	类型及其范围	说明  	默认值 
  暂无    	      	    	    

请求字段：

  Tables    	类型及其范围	说明     	默认值 
  bill_end  	string	查询截止日期 	    
  bill_start	string	查询开始日期 	    
  token     	string	token验证	    
  rid       	string	餐馆ID   	4   





返回字段说明:

  Tables    	类型及其范围	说明    	默认值       
  result    	number	请求是否成功	0为成功, 1为错误
  ev_message	string	报错信息  	空         
  orders    	array 	订单列表  	          

  bills 	类型及其范围	说明      	默认值 
  oid   	string	订单ID    	    
  date  	string	订单日期    	    
  time  	string	订单时间    	    
  dltype	string	送餐 or 自取	    
  total 	string	订单金额    	    



提交订单API

   Tables 	                   说明                   	默认值 
    URL   	http://www.chanmao.ca/index.php?r=rrclient/ordersubmit/	    
  HTTP请求方式	                  POST                  	    
   是否需要登录 	                   是                    	    
   授权访问限制 	                   暂无                   	    
   授权范围() 	                   暂无                   	    
    支持格式  	                  JSON                  	    

表头参数:

  Tables	类型及其范围	说明  	默认值 
  暂无    	      	    	    

请求字段：

  Tables 	类型及其范围	说明      	默认值  
  token  	string	token验证 	     
  rid    	string	餐馆ID    	     
  lat    	string	客户位置纬度  	     
  lng    	string	客户位置精度  	     
  channel	number	访问渠道    	4    
  addr   	string	客户地址    	     
  apt_no 	string	单元号     	     
  buzz   	string	进门code  	     
  city   	string	城市      	     
  comment	string	订单备注    	     
  dlexp  	number	运送费用    	     
  dltype 	number	运送 or 自取	1（运送）
  name   	string	用户姓名    	     
  postal 	string	邮编      	     
  pretax 	string	税前订单金额  	     
  tel    	string	用户电话    	     
  uid    	string	用户ID    	     





返回字段说明:

  Tables   	类型及其范围	说明    	默认值       
  result   	number	请求是否成功	0为成功, 1为错误
  error_msg	string	报错信息  	空         
  oid      	number	生成订单编号	          





订单处理API

   Tables 	                   说明                   	默认值 
    URL   	http://www.chanmao.ca/index.php?r=rrclient/handle/	    
  HTTP请求方式	                  POST                  	    
   是否需要登录 	                   是                    	    
   授权访问限制 	                   暂无                   	    
   授权范围() 	                   暂无                   	    
    支持格式  	                  JSON                  	    

表头参数:

  Tables	类型及其范围	说明  	默认值 
  暂无    	      	    	    

请求字段：

  Tables	类型及其范围	说明     	默认值 
  token 	string	token验证	    
  rid   	string	餐馆ID   	4   
  oid   	number	订单号    	    
  items 	array 	订单货物列表 	    
  task  	number	处理操作   	1   





返回字段说明:

  Tables    	类型及其范围	说明    	默认值       
  result    	number	请求是否成功	0为成功, 1为错误
  ev_message	string	报错信息  	成功        
