<?php 
        $db = mysql_connect('riskhorizontest.cfi8996g68d1.us-east-1.rds.amazonaws.com:3306', 'dbtesting', 'engagement') or die('Could not connect: ' . mysql_error()); 
        mysql_select_db('Risk_Horizon') or die('Could not select database');
 
        // Strings must be escaped to prevent SQL injection attack. 
        $session_uuid = mysql_real_escape_string(generate_random_string());
		$IPv4 = getRealIpAddr();
		$datetime = date("D M j G:i:s T Y");   
		$email = mysql_real_escape_string(generate_random_string()); 
        $hash = $_GET['hash']; 
 
        $secretKey="engagement"; # Change this value to match the value stored in the client javascript below 
		
		function generate_random_string($name_length = 8) {
			$alpha_numeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			return substr(str_shuffle($alpha_numeric), 0, $name_length);
		}
		
		
		
		
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



		$query = "insert into sessions values ('$session_uuid', '$IPv4', '$datetime', '$email');"; 
		$result = mysql_query($query); 

?>