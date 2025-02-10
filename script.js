const stories = [
    {
        title: "토끼와 거북이",
        audio: "audio/rabbit-turtle.mp3",
        image: "images/rabbit-turtle.jpg"
    },
    {
        title: "개미와 베짱이",
        audio: "audio/ant-grasshopper.mp3",
        image: "images/ant-grasshopper.jpg"
    }
    // 더 많은 이솝우화를 추가할 수 있습니다
];

let currentStoryIndex = 0;
let currentAudio = null;

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', checkSelection);
});

function checkSelection() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const messageElement = document.getElementById('message');
    const storyElement = document.getElementById('story');
    
    if (checkedCount === 4) {
        messageElement.textContent = '';
        storyElement.style.display = 'block';
        playStory(currentStoryIndex);
    } else {
        messageElement.textContent = '양패밀리 이야기를 듣고 싶으면 모두 선택하세요';
        storyElement.style.display = 'none';
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    }
}

function playStory(index) {
    const story = stories[index];
    const audio = document.getElementById('storyAudio');
    const image = document.getElementById('storyImage');
    
    // 이전 오디오 이벤트 리스너 제거
    if (currentAudio) {
        currentAudio.removeEventListener('ended', handleAudioEnd);
    }
    
    audio.src = story.audio;
    image.src = story.image;
    audio.style.display = 'block';
    
    // 새 오디오 설정
    currentAudio = audio;
    audio.addEventListener('ended', handleAudioEnd);
    
    // 오디오 재생
    try {
        audio.play().catch(error => {
            console.log('오디오 재생 실패:', error);
        });
    } catch (error) {
        console.log('오디오 재생 중 오류 발생:', error);
    }
}

function handleAudioEnd() {
    currentStoryIndex = (currentStoryIndex + 1) % stories.length;
    setTimeout(() => playStory(currentStoryIndex), 1000);
} 