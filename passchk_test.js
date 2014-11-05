function Set_Text(s)
{
   var e = document.getElementById('passchk_result');
   if (!e) return;   
   if (e.innerHTML == s) return;
   
   e.innerHTML = s;
}


var OldPass = -1;
function ShowStats()
{
   var pass = document.getElementById('passchk_field').value;
   var r = "";
   
   if (pass == OldPass) return window.setTimeout('ShowStats();', 200);
   OldPass = pass;
   
   if (pass.length == 0)
   {
      Set_Text("Enter a password to see its strength.");
      return window.setTimeout('ShowStats();', 200);
   }
   
   if (pass.length <= 4)
      r += "<b>WARNING:<font color=red>Very short password!</font></b><br>\n";
   else if (pass.length < 8)
      r += "<b>WARNING:</b>  <font color=red>Short password!</font><br>\n";
   
   // First, see if it is a common password.
   if (passchk_fast.passCommon(pass)) r += "<b>WARNING:  <font color=red>Common password!</font></b><br>\n";
   
   r += "<b>Length:</b>  " + pass.length + "<br>\n";
   
   // Calculate frequency chance
   var bits = passchk_fast.passEntropy(pass);
      
	if (bits < 28)
	{
	 r += "<b>Strength:  <font color=red>Very Weak</font></b> - ";
	 r += "Try making your password longer, including CAPITALS, or ";
	 r += "adding symbols.<br>\n";
	}
	else if (bits < 36)
	{
	 r += "<b>Strength:</b>  <font color=red>Weak</font> - ";
	 r += "Usually good enough for computer login passwords and to ";
	 r += "keep out the average person.<br>\n";
	}
	else if (bits < 60)
	{
	 r += "<b>Strength:</b>  <font color=brown>Reasonable</font> - ";
	 r += "This password is fairly secure cryptographically and ";
	 r += "skilled hackers may need some good computing power to ";
	 r += "crack it.  (Depends greatly on implementation!)<br>\n";
	}
	else if (bits < 128)
	{
	 r += "<b>Strength:</b>  <font color=green>Strong</font> - ";
	 r += "This password is typically good enough to safely guard ";
	 r += "sensitive information like financial records.<br>\n";
	}
	else
	{
	 r += "<b>Strength:</b>  <font color=blue>Very Strong</font> - ";
	 r += "More often than not, this level of security is overkill.<br>\n";
	}
	r += "<b>Entropy:</b>  " + (Math.round(bits * 10) / 10) + " bits<br>\n";
	r += "<b>Charset Size:</b>  " + passchk_fast.passCharsetSize(pass) + " chars<br>\n";
   
   Set_Text(r);   
   window.setTimeout('ShowStats();', 200);
}

window.setTimeout('ShowStats();', 200);
