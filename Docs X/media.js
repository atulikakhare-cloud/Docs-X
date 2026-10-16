document.addEventListener('DOMContentLoaded', () => {
  renderMediaStudioHub();
});

function renderMediaStudioHub() {
  const mediaSection = document.getElementById('mediaSection');
  if (!mediaSection) return;

  mediaSection.innerHTML = `
    <h2 style="margin-bottom: 15px;">🎨 Media Studio</h2>
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <button onclick="switchMediaTab('image')" id="btnImgTab" style="background: #89b4fa; color: #11111b;">🖼️ Image Editor</button>
      <button onclick="switchMediaTab('video')" id="btnVidTab" style="background: #313244; color: #cdd6f4;">🎬 Video Tools</button>
    </div>
    <div id="imageEditorView" style="display: flex; flex-direction: column; gap: 15px; flex: 1;"></div>
    <div id="videoEditorView" style="display: none; flex-direction: column; gap: 15px; flex: 1;"></div>
  `;

  initImageEditorUI();
  initVideoEditorUI();
}

function switchMediaTab(tab) {
  const imgView = document.getElementById('imageEditorView');
  const vidView = document.getElementById('videoEditorView');
  const btnImg = document.getElementById('btnImgTab');
  const btnVid = document.getElementById('btnVidTab');

  if (tab === 'image') {
    imgView.style.display = 'flex';
    vidView.style.display = 'none';
    btnImg.style.background = '#89b4fa';
    btnImg.style.color = '#11111b';
    btnVid.style.background = '#313244';
    btnVid.style.color = '#cdd6f4';
  } else {
    imgView.style.display = 'none';
    vidView.style.display = 'flex';
    btnVid.style.background = '#89b4fa';
    btnVid.style.color = '#11111b';
    btnImg.style.background = '#313244';
    btnImg.style.color = '#cdd6f4';
  }
}
