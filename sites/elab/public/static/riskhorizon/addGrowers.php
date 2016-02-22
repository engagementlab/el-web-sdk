<?php 
        $db = mysql_connect('riskhorizontest.cfi8996g68d1.us-east-1.rds.amazonaws.com:3306', 'dbtesting', 'engagement') or die('Could not connect: ' . mysql_error()); 
        mysql_select_db('Risk_Horizon') or die('Could not select database');
 
        // Strings must be escaped to prevent SQL injection attack. 
		$grower_uuid = mysql_real_escape_string($_GET['grower_uuid'], $db); 
        $level_uuid = mysql_real_escape_string($_GET['level_uuid'], $db); 
		$growerI = mysql_real_escape_string($_GET['growerI'], $db);	
		$growerII = mysql_real_escape_string($_GET['growerII'], $db);
		$growerIII = mysql_real_escape_string($_GET['growerIII'], $db); 
        $growerIV = mysql_real_escape_string($_GET['growerIV'], $db); 
		$growerV = mysql_real_escape_string($_GET['growerV'], $db);
		$growerVI = mysql_real_escape_string($_GET['growerVI'], $db); 
        $growerVII = mysql_real_escape_string($_GET['growerVII'], $db);
		$growerVIII = mysql_real_escape_string($_GET['growerVIII'], $db);  
		$growerIX = mysql_real_escape_string($_GET['growerIX'], $db);
        $hash = $_GET['hash']; 
 
        $secretKey="engagement"; # Change this value to match the value stored in the client javascript below 

        $real_hash = md5($grower_uuid . $level_uuid . $growerI . $growerII . $growerIII . $growerIV . $growerV . $growerVI . $growerVII . $growerVIII . $growerIX . $secretKey); 
        if($real_hash == $hash) { 
            // Send variables for the MySQL database class. 
            $query = "insert into growers values ('$grower_uuid', '$level_uuid', '$growerI', '$growerII', '$growerIII', '$growerIV', '$growerV', '$growerVI', '$growerVII', '$growerVIII', '$growerIX');"; 
            $result = mysql_query($query); 
        }else{
	  // Failure
	  // $message = "Subject creation failed";
	  die("Database query failed. " . mysql_error($db));
  }
?>