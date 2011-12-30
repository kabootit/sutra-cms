<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%> 
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<!-- <title>HTML5 boilerplate—all you really need…</title> -->
	<link rel="stylesheet" type="text/css" href="<%=(String)request.getAttribute("themeDirectory")%>/css/style.css" />
	<!--[if IE]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<jsp:include page='<%= (String)request.getAttribute("head") %>' /> 
</head>

<body id="home">
	<header>
	      <h1>Simple Boilerplate</h1>
	</header>
	
	<article>
		<section>
			<%=pageData.get("Main")%>
		</section>
	</article>
	
<jsp:include page='<%= (String)request.getAttribute("foot") %>' /> 
</body>
</html>