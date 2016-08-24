 var zmt_mtag;
function zd_get_placements(){
 zmt_mtag = zmt_get_tag(2132,"539103");
 p539103_1 = zmt_mtag.zmt_get_placement("zt_539103_1", "539103", "1" , "496" , "9" , "15" ,"300", "250");
 p539103_2 = zmt_mtag.zmt_get_placement("zt_539103_2", "539103", "2" , "499" , "9" , "15" ,"300", "250");
 p539103_3 = zmt_mtag.zmt_get_placement("zt_539103_3", "539103", "3" , "498" , "9" , "15" ,"300", "250");
 p539103_4 = zmt_mtag.zmt_get_placement("zt_539103_4", "539103", "4" , "601" , "17" , "15" ,"300", "600");
 p539103_5 = zmt_mtag.zmt_get_placement("zt_539103_5", "539103", "5" , "500" , "14" , "15" ,"728", "90");
 p539103_6 = zmt_mtag.zmt_get_placement("zt_539103_6", "539103", "6" , "602" , "9" , "15" ,"300", "250");
 p539103_7 = zmt_mtag.zmt_get_placement("zt_539103_7", "539103", "7" , "603" , "9" , "15" ,"300", "250");

 zmt_mtag.zmt_set_async();
 zmt_mtag.zmt_load(zmt_mtag); 
} 