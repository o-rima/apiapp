$('#btn').on('click', function(){
    const targetArtistName = $("#keyword").val();
    const requestUrl = `https://itunes.apple.com/search?lang=ja_JP&entry=music&media=music&country=JP&limit=50&term=${targetArtistName}`;

    $.getJSON(requestUrl, function (data) {
        console.log(data);
        
    // 表示されている曲情報を一旦クリア
    $("#result").empty();
        const songs = data.results;
        let currentPlayingIndex = -1; // 現在再生中の曲のインデックスをトラックする変数

        songs.forEach(function(song, index){
            const trackName = song.trackName;// 曲名
            const artistName = song.artistName;// アーティスト名
            const artworkUrl = song.artworkUrl100;// 画像
            const previewUrl = song.previewUrl; // プレビューURL

        const music = `<div class="music">
            <img src="${artworkUrl}" alt="${trackName}">
            <button class="play-button play-icon" data-index="${index}" data-preview-url="${previewUrl}">&#9658;</button>
                <div>
                    <p class="track-name">${trackName}</p>
                    <p class="artist-name">${artistName}</p>
                </div>
            </div>`;
            
            // 曲情報を表示
            $("#result").append(music);
        });

    // 再生ボタンをクリックした時の処理
    $(document).on('click', '.play-button', function() {
        const button = $(this);
        const index = button.data('index');
        const previewUrl = button.data('preview-url');

    // 曲と再生ボタンを更新
        if (currentPlayingIndex !== -1) {
            $(".track-name").eq(currentPlayingIndex).removeClass("playing");
            $(".play-button").eq(currentPlayingIndex).removeClass("stop-icon").html("&#9658;"); // 再生アイコンに戻す
        }

        if (currentPlayingIndex === index) {
        $('#audio')[0].pause(); // 停止
                currentPlayingIndex = -1;
            } else {
                currentPlayingIndex = index;
                $(".track-name").eq(currentPlayingIndex).addClass("playing");
                button.addClass("stop-icon").html("&#9208;"); // 停止アイコンに変更

        $('#audio').attr('src', previewUrl);
        $('#audio')[0].play();
        }
        });

    // 音楽再生が停止した時の処理
    $('#audio').on('ended', function() {
        if (currentPlayingIndex !== -1) {
            $(".track-name").eq(currentPlayingIndex).removeClass("playing");
            $(".play-button").eq(currentPlayingIndex).removeClass("stop-icon").html("&#9658;"); // 再生アイコンに戻す
            currentPlayingIndex = -1;
            }
        });
    });
});
