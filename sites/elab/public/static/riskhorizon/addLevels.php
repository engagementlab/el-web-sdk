<?php 
        $db = mysql_connect('riskhorizontest.cfi8996g68d1.us-east-1.rds.amazonaws.com:3306', 'dbtesting', 'engagement') or die('Could not connect: ' . mysql_error()); 
        mysql_select_db('Risk_Horizon') or die('Could not select database');
 
        // Strings must be escaped to prevent SQL injection attack. 
		$level_uuid = mysql_real_escape_string($_GET['level_uuid'], $db); 
        $session_uuid = mysql_real_escape_string($_GET['session_uuid'], $db); 
		$level = mysql_real_escape_string($_GET['level'], $db);	
		$pause_time = mysql_real_escape_string($_GET['pause_time'], $db);
		$insuranceI = mysql_real_escape_string($_GET['insuranceI'], $db); 
        $insuranceII = mysql_real_escape_string($_GET['insuranceII'], $db); 
		$insuranceIII = mysql_real_escape_string($_GET['insuranceIII'], $db);
		$development_end_percent = mysql_real_escape_string($_GET['development_end_percent'], $db); 
        $protection_end_percent = mysql_real_escape_string($_GET['protection_end_percent'], $db); 
		$knowledge_time = mysql_real_escape_string($_GET['knowledge_time'], $db);  
        $hash = $_GET['hash']; 
 
        $secretKey="engagement"; # Change this value to match the value stored in the client javascript below 

        $real_hash = md5($level_uuid . $session_uuid . $level . $pause_time . $insuranceI . $insuranceII . $insuranceIII . $development_end_percent . $protection_end_percent . $knowledge_time . $secretKey); 
        if($real_hash == $hash) { 
            // Send variables for the MySQL database class. 
            $query = "insert into levels values ('$level_uuid', '$session_uuid', '$level', '$pause_time', '$insuranceI', '$insuranceII', '$insuranceIII', '$development_end_percent', '$protection_end_percent', '$knowledge_time');"; 
            $result = mysql_query($query); 
        }else{
	  // Failure
	  // $message = "Subject creation failed";
	  die("Database query failed. " . mysql_error($db));
  }
?>