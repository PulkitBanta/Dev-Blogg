package com.pukitbanta.springblog.dto;

public class PostDto {

	private Long id;
	private String content;
	private String title;
	private String username;
	private String createdOn;
	private String updatedOn;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getCreatedOn() {
		return createdOn;
	}
	
	public void setCreatedOn(String createdOn) {
		this.createdOn = createdOn;
	}
	
	public String getUpdatedOn() {
		return updatedOn;
	}
	
	public void setUpdatedOn(String updatedOn) {
		this.updatedOn = updatedOn;
	}
}
