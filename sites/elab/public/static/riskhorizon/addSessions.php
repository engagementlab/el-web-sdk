<?php 
        $db = mysql_connect('riskhorizontest.cfi8996g68d1.us-east-1.rds.amazonaws.com:3306', 'dbtesting', 'engagement') or die('Could not connect: ' . mysql_error()); 
        mysql_select_db('Risk_Horizon') or die('Could not select database');
 
        // Strings must be escaped to prevent SQL injection attack. 
        $session_uuid = mysql_real_escape_string($_GET['session_uuid'], $db);
		$IPv4 = getRealIpAddr();
		$datetime = date("D M j G:i:s T Y");   
		$email = mysql_real_escape_string($_GET['email'], $db); 
        $hash = $_GET['hash']; 
 
        $secretKey="engagement"; # Change this value to match the value stored in the client javascript below 
		function getRealIpAddr()
		{
			if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
			{
			  $ip=$_SERVER['HTTP_CLIENT_IP'];
			}
			elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
			{
			  $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
			}
			else
			{
			  $ip=$_SERVER['REMOTE_ADDR'];
			}
			return $ip;
		}








        $real_hash = md5($session_uuid . $email . $secretKey); 
        if($real_hash == $hash) { 
            // Send variables for the MySQL database class. 
            $query = "insert into sessions values ('$session_uuid', '$IPv4', '$datetime', '$email');"; 
            $result = mysql_query($query); 
        }else{
	  // Failure
	  // $message = "Subject creation failed";
	  die("Database query failed. " . mysql_error($db));
  }
?>