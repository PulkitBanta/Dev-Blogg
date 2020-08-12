package com.pukitbanta.springblog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pukitbanta.springblog.model.Post;

public interface PostRepository extends JpaRepository<Post, Long>{
	
	List<Post> findByUsername(String username);

}
