// script.js

document.addEventListener("DOMContentLoaded", function() {
	const audio = document.getElementById("audio");
	const lyricsContainer = document.getElementById("lyrics-container");

	// LRC 格式的歌词文本（可以从文件中读取）
	const lrcText = `
       [00:00.0]baby 这不是情歌
[00:01.03]作词：Riyo 橙
[00:02.06]作曲：Riyo 橙
[00:03.09]编曲：单小源
[00:04.13]和声：悠一
[00:05.16]混音：迪路
[00:06.19]制作人：黄欣彬
[00:07.23]监制：Riyo 橙
[00:08.26]编曲/混音/母带：乔木星乐Music Studio
[00:09.29]音乐制作：乔木星乐Music Studio
[00:10.33]发行公司：北京乔木星乐文化传媒有限公司
[00:11.37]你眉眼不开心噘嘴的小脾气
[00:14.55]可爱又任性撩动我的思绪
[00:17.07]说我又不理你少了一点点关心
[00:19.98]别人都不在意就是需要我的珍惜
[00:24.03]baby 这不是情歌是我想对你说
[00:29.7]baby 我不会闪躲my love for u
[00:34.35]也许你也有过怀疑
[00:37.5]我的未来有没有你
[00:40.77]也许我也没有说明
[00:43.08]你就是我的唯一
[00:45.06]所有的一切温柔
[00:47.85]是你懂我给我快乐
[00:51.15]填满我灰白生活
[00:55.8]baby 这不是情歌
[01:01.95]是我想对你说
[01:08.520004]你眉眼不开心噘嘴的小脾气
[01:11.67]可爱又任性撩动我的思绪
[01:14.85]说我又不理你少了一点关心
[01:17.4]别人都不在意需要我的珍惜
[01:21.12]baby 这不是情歌是我想对你说
[01:32.22]baby 这不是情歌是我想对你说
[01:37.95]baby 我不会闪躲my love for u
[01:42.509995]像天使般善良的你
[01:45.42]我怎会舍得离开你
[01:48.240005]心里最柔软的角落
[01:51.39]就只有你能触摸
[01:53.91]所有的一切美好是你是我
[02:01.35]潮起潮落倾其我所有爱着
[02:06.51]baby 这不是情歌
[02:08.63]真心想对你说
[02:28.5]像天使般善良的你
[02:31.38]我怎会舍得离开你
[02:34.2]心里最柔软的角落
[02:37.23]就只有你能触摸
[02:41.31]所有的一切美好是你是我
[02:45.81]潮起潮落倾其我所有爱着
[02:52.56]baby 这不是情歌
[03:01.53]真心想对你说
    `;

	// 解析 LRC 歌词文本
	const lyrics = parseLrc(lrcText);

	let currentLyricIndex = 0;

	// 解析 LRC 歌词的函数
	function parseLrc(lrcText) {
		const lines = lrcText.split("\n");
		return lines.map(line => {
			const timeMatch = line.match(/\[(\d{2}):(\d{2}\.\d{2})\]/);
			if(timeMatch) {
				const minutes = parseInt(timeMatch[1]);
				const seconds = parseFloat(timeMatch[2]);
				const timeInSeconds = minutes * 60 + seconds;
				const text = line.replace(timeMatch[0], "").trim();
				return {
					time: timeInSeconds,
					text
				};
			}
			return null;
		}).filter(line => line !== null);
	}

	// 创建并显示歌词
	function showLyric(index) {
		lyricsContainer.textContent = lyrics[index].text;
		lyricsContainer.classList.add("active");
	}

	// 当音频播放时，检查当前时间并更新歌词
	audio.addEventListener("timeupdate", function() {
		const currentTime = audio.currentTime;

		// 查找当前时间对应的歌词
		while(currentLyricIndex < lyrics.length && currentTime >= lyrics[currentLyricIndex].time) {
			currentLyricIndex++;
		}

		// 显示当前歌词
		if(currentLyricIndex > 0 && currentLyricIndex <= lyrics.length) {
			showLyric(currentLyricIndex - 1);
		}
	});

	// 初始显示第一行歌词
	if(lyrics.length > 0) {
		showLyric(0);
	}
});