<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../layout/head.jspf"%>
<section class="dotory_full_wrap">
	<header>
		<h1>URL Parsing</h1>
	</header>
	<article class="dotory_full_left">
		<header>
			<h2>List</h2>
		</header>
		<div class="dotory_full_content_wrap">
			<!-- Paging Scroll 에 따라서 로딩 -->
			<div class="dotory_full_content">
				<label for="dotory_input" class="dotory_label" id="dotory_url_label">URL</label>
				<input type="text" class="dotory_input" id="dotory_url_input"/>
				<button class="dotory_btn" id="dotory_url_post">Do</button>
			</div>
		</div>
	</article>
	<article class="dotory_full_right">
		<header>
			<h2>Content</h2>
		</header>
		<div class="dotory_url_parsing_data_wrap">
			<!-- Real Time Content -->
			
		</div>
	</article>
	<footer>
		<!-- Loading ... && Progress Bar -->
		Made
	</footer>
</section>
<%@ include file="../layout/foot.jspf"%>
