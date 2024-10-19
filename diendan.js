document.addEventListener('DOMContentLoaded', function () {
    const questionForm = document.getElementById('questionForm');
    const questionInput = document.getElementById('questionInput');
    const questionsContainer = document.getElementById('questionsContainer');

    // Mảng câu hỏi ban đầu
    let questions = [
        {
            id: 1,
            text: "How do I pronounce the Vietnamese letter 'ư' correctly?",
            answers: []
        },
        {
            id: 2,
            text: "What's the difference between 's' and 'x' sounds in Vietnamese?",
            answers: []
        }
    ];

    // Hàm render câu hỏi và câu trả lời
    function renderQuestions() {
        questionsContainer.innerHTML = ''; // Xóa nội dung cũ

        questions.forEach(question => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            // Header chứa câu hỏi và nút like/dislike
            const questionHeader = document.createElement('div');
            questionHeader.classList.add('question-header');
           
            const questionText = document.createElement('h3');
            questionText.textContent = question.text;
            questionHeader.appendChild(questionText);

            // Thêm container cho nút Like và Dislike
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            likeButton.innerHTML = `<i class="fa fa-thumbs-up"></i>`;
            buttonContainer.appendChild(likeButton);

            const likeCount = document.createElement('span');
            likeCount.textContent = '0'; 
            buttonContainer.appendChild(likeCount);

            const dislikeButton = document.createElement('button');
            dislikeButton.classList.add('dislike-button');
            dislikeButton.innerHTML = `<i class="fa fa-thumbs-down"></i>`;
            buttonContainer.appendChild(dislikeButton);

            const dislikeCount = document.createElement('span');
            dislikeCount.textContent = '0'; 
            buttonContainer.appendChild(dislikeCount);

            questionHeader.appendChild(buttonContainer);
            questionDiv.appendChild(questionHeader);

            // Form để thêm câu trả lời
            const answerForm = document.createElement('form');
            answerForm.innerHTML = `
                <textarea placeholder="Answer this question..."></textarea>
                <button type="submit">Submit</button>
            `;
            questionDiv.appendChild(answerForm);

            // Xử lý thêm câu trả lời
            answerForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const answerInput = answerForm.querySelector('textarea').value;
                if (answerInput.trim() !== '') {
                    question.answers.push({
                        text: answerInput,
                        replies: []
                    });
                    renderQuestions(); // Cập nhật lại câu hỏi và câu trả lời
                }
            });

            // Hiển thị các câu trả lời
            question.answers.forEach(answer => {
                const answerDiv = document.createElement('div');
                answerDiv.classList.add('answer');
                answerDiv.textContent = `Answer: ${answer.text}`;
                questionDiv.appendChild(answerDiv);

                renderReplies(answerDiv, answer);

                // Form để trả lời câu trả lời
                const replyForm = document.createElement('form');
                replyForm.innerHTML = `
                    <textarea placeholder="Reply to this answer..."></textarea>
                    <button type="submit">Reply</button>
                `;
                answerDiv.appendChild(replyForm);

                // Xử lý thêm phản hồi cho câu trả lời
                replyForm.addEventListener('submit', function (event) {
                    event.preventDefault();
                    const replyInput = replyForm.querySelector('textarea').value;
                    if (replyInput.trim() !== '') {
                        answer.replies.push({
                            text: replyInput,
                            replies: []
                        });
                        renderQuestions(); // Cập nhật lại phần trả lời
                    }
                });
            });

            questionsContainer.appendChild(questionDiv); 
        });
    }

    // Hàm hiển thị các phản hồi
    function renderReplies(parentDiv, reply) {
        reply.replies.forEach(subReply => {
            const replyDiv = document.createElement('div');
            replyDiv.classList.add('reply');
            replyDiv.textContent = `Reply: ${subReply.text}`;
            parentDiv.appendChild(replyDiv);

            renderReplies(replyDiv, subReply);

            // Form để trả lời thêm cho câu trả lời con
            const nestedReplyForm = document.createElement('form');
            nestedReplyForm.innerHTML = `
                <textarea placeholder="Reply to this reply..."></textarea>
                <button type="submit">Reply</button>
            `;
            replyDiv.appendChild(nestedReplyForm);

            nestedReplyForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const nestedReplyInput = nestedReplyForm.querySelector('textarea').value;
                if (nestedReplyInput.trim() !== '') {
                    subReply.replies.push({
                        text: nestedReplyInput,
                        replies: []
                    });
                    renderQuestions(); // Cập nhật lại phần trả lời
                }
            });
        });
    }

    // Xử lý khi gửi câu hỏi mới
    questionForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        const questionText = questionInput.value.trim();
        if (questionText !== '') {
            const newQuestion = {
                id: questions.length + 1,
                text: questionText,
                answers: []
            };
            questions.push(newQuestion); // Thêm câu hỏi mới vào danh sách
            renderQuestions(); // Cập nhật danh sách câu hỏi
            questionInput.value = ''; // Xóa nội dung input
        } else {
            alert('Vui lòng nhập câu hỏi!');
        }
    });

    // Hàm render ban đầu
    renderQuestions();

    questionsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("like-button")) {
            // Xử lý sự kiện cho nút Like
            const likeCountSpan = event.target.nextElementSibling; 
            let currentCount = parseInt(likeCountSpan.innerText);
            likeCountSpan.innerText = currentCount + 1; // Tăng số lượng Like
        }
    
        if (event.target.classList.contains("dislike-button")) {
            // Xử lý sự kiện cho nút Dislike
            const dislikeCountSpan = event.target.nextElementSibling; 
            let currentCount = parseInt(dislikeCountSpan.innerText);
            dislikeCountSpan.innerText = currentCount + 1; // Tăng số lượng Dislike
        }
    });    
});
