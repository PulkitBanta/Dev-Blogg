package com.pukitbanta.springblog.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.pukitbanta.springblog.dto.PostDto;
import com.pukitbanta.springblog.exception.PostNotFoundException;
import com.pukitbanta.springblog.model.Post;
import com.pukitbanta.springblog.repository.PostRepository;

@Service
public class PostService {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private PostRepository postRepository;
	
	public void createOrUpdatePost(PostDto postDto) {
		Post post = mapFromDtoToPost(postDto);
		postRepository.save(post);
	}
	
	public List<PostDto> getPosts() {
		List<Post> posts = postRepository.findAllByOrderByCreatedOnDesc();
		return posts.stream().map(this::mapFromPostToDto).collect(Collectors.toList());
	}
	
	public List<PostDto> getUserPosts(String username) {
		List<Post> posts = postRepository.findByUsernameOrderByCreatedOnDesc(username);
		return posts.stream().map(this::mapFromPostToDto).collect(Collectors.toList());
	}
	
	public ResponseEntity<String> deletePost(Long id) {
		if(postRepository.existsById(id)) {
			postRepository.deleteById(id);
			return new ResponseEntity<String>("Post Successfully Deleted", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("Post Not Found", HttpStatus.OK);
	}
	
	public List<PostDto> getPostsByTag(String tag) {
		List<Post> posts = postRepository.findByTagOrderByCreatedOnDesc(tag);
		return posts.parallelStream().map(this::mapFromPostToDto).collect(Collectors.toList());
	}

	private PostDto mapFromPostToDto(Post post) {
		
		PostDto postDto = new PostDto();
		
		postDto.setId(post.getId());
		postDto.setTag(post.getTag());
		postDto.setTitle(post.getTitle());
		postDto.setContent(post.getContent());
		postDto.setUsername(post.getUsername());
		postDto.setCreatedOn(post.getCreatedOn());
		postDto.setUpdatedOn(post.getUpdatedOn());
		
		return postDto;
	}
	
	private Post mapFromDtoToPost(PostDto postDto) {
		Post post = new Post();
		post.setTitle(postDto.getTitle());
		post.setId(postDto.getId());
		post.setTag(postDto.getTag());
		post.setContent(postDto.getContent());
		User username = authService.getCurrentUser().orElseThrow(()-> new IllegalArgumentException("No user logged in"));
		post.setUsername(username.getUsername());
		post.setCreatedOn(Instant.now().toString());
		post.setUpdatedOn(Instant.now().toString());
		
		return post;
	}

	public PostDto getPost(Long id) {
		Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("For id " + id));
		return mapFromPostToDto(post);
	}
	
}
