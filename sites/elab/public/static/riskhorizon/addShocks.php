<?php 
        $db = mysql_connect('riskhorizontest.cfi8996g68d1.us-east-1.rds.amazonaws.com:3306', 'dbtesting', 'engagement') or die('Could not connect: ' . mysql_error()); 
        mysql_select_db('Risk_Horizon') or die('Could not select database');
 
        // Strings must be escaped to prevent SQL injection attack. 
		$shock_uuid = mysql_real_escape_string($_GET['shock_uuid'], $db); 
        $level_uuid = mysql_real_escape_string($_GET['level_uuid'], $db); 
		$instantiate_time = mysql_real_escape_string($_GET['instantiate_time'], $db);	
		$probability = mysql_real_escape_string($_GET['probability'], $db);
		$severity = mysql_real_escape_string($_GET['severity'], $db); 
        $time_researched = mysql_real_escape_string($_GET['time_researched'], $db); 
		$damage = mysql_real_escape_string($_GET['damage'], $db);
		$times_viewed = mysql_real_escape_string($_GET['times_viewed'], $db); 
        $minigame_multiplier = mysql_real_escape_string($_GET['minigame_multiplier'], $db); 
        $hash = $_GET['hash']; 
 
        $secretKey="engagement"; # Change this value to match the value stored in the client javascript below 

        $real_hash = md5($shock_uuid . $level_uuid . $instantiate_time . $probability . $severity . $time_researched . $damage . $times_viewed . $minigame_multiplier . $secretKey); 
        if($real_hash == $hash) { 
            // Send variables for the MySQL database class. 
            $query = "insert into shocks values ('$shock_uuid', '$level_uuid', '$instantiate_time', '$probability', '$severity', '$time_researched', '$damage', '$times_viewed', '$minigame_multiplier');"; 
            $result = mysql_query($query); 
        }else{
	  // Failure
	  // $message = "Subject creation failed";
	  die("Database query failed. " . mysql_error($db));
  }
?>