import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal, Preloader, Card } from 'react-materialize'
import { deletePost } from '../../store/actions'
import { connect } from 'react-redux'

function UserPosts(props) {
  function deletePost(e, id) {
    e.preventDefault()

    props.deletePost(id)
  }

  if (props.userPosts.length) {
    return (
      <div className="user-post-list">
        <div className="row">
          <h4>User Posts:</h4>
          <div className="post-grid">
            {props.userPosts.map(post => {
              // pass id into picsum api for image src
              const randomImgId = post.id
              return (
                <Card
                  className="hoverable"
                  key={post.id}
                  header={
                    <div className="card-image">
                      <img
                        className="activator"
                        src={`https://picsum.photos/id/${randomImgId}/500/500`}
                        alt={post.title}
                      />
                      <span className="card-title activator">{post.title}</span>

                      <Modal
                        header="Are you sure?"
                        trigger={
                          <Button
                            floating
                            className="halfway-fab waves-effect waves-light red"
                          >
                            <i className="material-icons">delete</i>
                          </Button>
                        }
                        actions={[
                          <Button
                            className="red"
                            onClick={e => deletePost(e, post.id)}
                          >
                            I am sure
                          </Button>,
                          <Button modal="close">Cancel</Button>
                        ]}
                      >
                        <p className="flow-text">
                          You cannot undo this action!
                        </p>
                      </Modal>
                    </div>
                  }
                  reveal={
                    <div>
                      <header>
                        <h6>{post.title}</h6>
                        <span>
                          {post.city}, {post.country}
                        </span>
                      </header>
                      <p>{post.description}</p>
                      <footer>
                        <Button
                          onClick={e => {
                            e.preventDefault()

                            props.history.push(
                              `${props.match.path}/posts/update/${post.id}`
                            )
                          }}
                        >
                          Edit Post
                        </Button>{' '}
                        <br />
                        <br />
                        <span className="meta grey-text">
                          Posted: {post.created_at} <br /> Last Updated:{' '}
                          {post.updated_at}
                        </span>
                      </footer>
                    </div>
                  }
                >
                  <p>
                    {post.city}
                    {', '}
                    {post.country}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // if userPosts is 0 and state isLoading is true then display the loading indicator
  if (!props.userPosts.length && props.isLoading) {
    return (
      <div className="user-post-list">
        <div className="row">
          <div className="post-grid">
            <Preloader />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="user-post-list">
      <div className="row">
        <div className="post-grid">
          <div className="no-posts">
            <h4>You haven't created any posts yet!</h4>
            <Button large>Create Post</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.postsReducer.isLoadingUserPosts
})

export default withRouter(
  connect(
    mapStateToProps,
    { deletePost }
  )(UserPosts)
)

/*

*/