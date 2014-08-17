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
				<input type="text" id="dotory_userPn" value="2"/>
				<label for="dotory_input" class="dotory_label" id="dotory_url_label">URL</label>
				<input type="text" class="dotory_input" id="dotory_url_input"/>
				<button class="dotory_btn" id="dotory_url_post">Do</button>
				<button class="dotory_btn" id="dotory_list_post">Load</button>
			</div>
			<ul class="dotory_url_list">
			
			</ul>
		</div>
	</article>
	<article class="dotory_full_right">
		<header>
			<h2>Content</h2>
			<menu>
				<li class="dotory_url_menu" data-type="html">
					<span>Html Source</span>
				</li>
				<li class="dotory_url_menu" data-type="image">
					<span>Image Url Data</span>
				</li>
				<li class="dotory_url_menu" data-type="html2">
					<span>Html Source 2</span>
				</li>
				<li class="dotory_url_menu" data-type="title">
					<span>Title Data</span>
				</li>
			</menu>
		</header>
		<div class="dotory_url_parsing_data_wrap" data-type="html">
			<!-- Real Time Content -->
			<div class="dotory_url_parsing_data_content">
				
			</div>
		</div>
		<div class="dotory_url_parsing_data_wrap" data-type="image" style="display: none;">
			<div class="dotory_url_parsing_data_content">
				
			</div>		
		</div>
		<div class="dotory_url_parsing_data_wrap" data-type="html2" style="display: none;">
			<div class="dotory_url_parsing_data_content">
				
			</div>		
		</div>
		<div class="dotory_url_parsing_data_wrap" data-type="title" style="display: none;">
			<div class="dotory_url_parsing_data_content">
				
			</div>		
		</div>
	</article>
	<footer>
		<!-- Loading ... && Progress Bar -->
		Made
	</footer>
</section>
<%@ include file="../layout/foot.jspf"%>
