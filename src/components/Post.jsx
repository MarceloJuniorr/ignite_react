import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';
import { useState } from 'react';



export function Post({author, content, publishedAt}) {

const [comments, setComments] = useState(['Test comment content'])
const [newComment, setNewComment] = useState ('')

const newCommentIsEmpty = newComment.length === 0;

function handleCreateNewComment() {
  event.preventDefault()
  setComments([...comments, newComment ])
  setNewComment('')

  
}

function handleNewCommentChange() {
 setNewComment(event.target.value)

}
function deleteComment(commentDelete) {
  const newCommentsListWithoutDeletedOne = comments.filter((comment) => {
    return comment !== commentDelete
  })
  setComments(newCommentsListWithoutDeletedOne)
}


  const publishedDateFormatted = format(publishedAt,"d 'de' LLLL 'às' HH:mm'h'",{locale: ptBR} )
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          }
          if (line.type === 'link') {
            return <p key={line.content}><a href="">{line.content}</a></p>
          }
        })}


      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          value={newComment}
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
        />

        <footer>
          <button
            disabled={newCommentIsEmpty} 
            type="submit">
              Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment onDeleteComment={deleteComment} key={comment} content={comment}/>
        })}
      </div>
    </article>
  )
}
