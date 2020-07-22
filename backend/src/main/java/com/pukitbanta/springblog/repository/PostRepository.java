package com.pukitbanta.springblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pukitbanta.springblog.model.Post;

public interface PostRepository extends JpaRepository<Post, Long>{

}
