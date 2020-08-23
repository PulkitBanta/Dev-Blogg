package com.pukitbanta.springblog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pukitbanta.springblog.dto.PostDto;
import com.pukitbanta.springblog.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	
	@Autowired
	private PostService postService;

	@PostMapping
	public ResponseEntity create(@RequestBody PostDto postDto) {
		postService.createPost(postDto);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<PostDto>> getPosts() {
		return new ResponseEntity<>(postService.getPosts(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PostDto> getPost(@PathVariable Long id) {
		return new ResponseEntity<>(postService.getPost(id), HttpStatus.OK);
	}
	
	@GetMapping("users/{username}")
	public ResponseEntity<List<PostDto>> getUserPosts(@PathVariable String username) {
		return new ResponseEntity<>(postService.getUserPosts(username), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletePost(@PathVariable Long id) {
		return postService.deletePost(id);
	}
	
}
