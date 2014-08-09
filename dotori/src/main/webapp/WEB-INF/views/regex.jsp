<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../layout/head.jspf"%>
<section class="dotory_4partition_wrap">
	<article class="dotory_4partition">
		<header>
			<h3>Get</h3>
		</header>
		<div>
			<form:form commandName="regex" action="${cp }/regex/" method="get">
				<form:select path="groupPn" onchange="submit();">
					<form:options items="${regexGroup }" itemLabel="name" itemValue="groupPn"/>
				</form:select>
				<form:select path="regexCategory" onchange="submit();">
					<form:option value="1">Image</form:option>
					<form:option value="2">Title</form:option>
				</form:select>
			</form:form>
			<ul class="dotroy_4partition_list">
			<c:forEach items="${regexList }" var="re" varStatus="loop">
				<li data-pn="<c:out value='${re.pn }'/>" data-shape="<c:out value='${re.shape }'/>"><c:out value="${re.shape }"/></li>
			</c:forEach>
			</ul>
		</div>
		<footer>
			
		</footer>
	</article>
	
	<article class="dotory_4partition">
		<header>
			<h3>Post</h3>
		</header>
		<div>
			<form:form commandName="postRegex" action="${cp }/regex/" method="post">
				<form:select path="groupPn">
					<form:options items="${regexGroup }" itemLabel="name" itemValue="groupPn"/>
				</form:select>
				<form:input path="shape"/>
				<form:hidden path="regexCategory" value="${regex.regexCategory }"/>
				<button type="submit">Post</button>
			</form:form>
		</div>	
		<footer>
			
		</footer>
	</article>
	
	<article class="dotory_4partition">
		<header>
			<h3>Put</h3>
		</header>
		<div>
			<form:form commandName="putRegex" action="${cp }/regex/" method="put">
				<form:hidden path="pn"/>
				<form:hidden path="regexCategory" value="${regex.regexCategory }"/>
				<form:hidden path="groupPn" value="${regex.groupPn }"/>
				<form:input path="shape"/>
				
				<button type="submit">Put</button>
			</form:form>
		</div>
		<footer>
			
		</footer>
	</article>
	
	<article class="dotory_4partition">
		<header>
			<h3>Delete</h3>
		</header>
		<div>
			<form:form commandName="deleteRegex" action="${cp }/regex/" method="delete">
				<form:hidden path="pn"/>
				<form:hidden path="regexCategory" value="${regex.regexCategory }"/>
				<form:hidden path="groupPn" value="${regex.groupPn }"/>
				<span id="dotory_delete_regex"></span>
				<button type="submit">Delete</button>
			</form:form>
		</div>
		<footer>
		
		</footer>
	</article>
</section>


<%@ include file="../layout/foot.jspf"%>