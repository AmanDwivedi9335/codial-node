{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'POST',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('.posts-view>ul').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }

                });
            });
        }


        //method to create post in a DOM

        let newPostDom = function(post){
            return $(`<li id="post-${ post._id }">
                            <small>
                                    <a class="delete-post-button" href="/posts/destroy/${post.id}">Delete</a> 
                            </small>
                                
                                <br>
                                ${post.content} 
                                <small>by <b>${ post.user.name }</b></small>
                            
                                <div class="comment-container">
                                    
                                    <form action="/comments/create" method="post">
                                        <input type="text" name="content" placeholder="type your comment here...">
                                        <input type="hidden" name="post" value="${ post._id }">
                                        <input type="submit">
                                    </form>
                                    
                                </div>
                            
                            </li>
                            
                            <!-- this is comment section view file -->
                            <div class="post-comments-list">
                                    <ul id ="post-comments-${ post._id }">
                                        
                                    </ul>
                            </div>
                        `)
        }

        createPost();

}

