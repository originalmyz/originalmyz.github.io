const userId = "1173726257582723102";
const links = [
    {
        label: "GitHub",
        url: "https://github.com/originalmyz",
        image: "images/github.png",
    },
    {
        label: "Guns.lol",
        url: "https://guns.lol/originalmyz",
        image: "images/gunslol.png",
    },
    {
        label: "Tiktok",
        url: "https://www.tiktok.com/@originalmyz",
        image: "images/tiktok.png",
    },
    {
        label: "Discord",
        url: "https://discord.com/users/1173726257582723102/",
        image: "images/discord.png",
    },
     {
        label: "Spotify",
        url: "https://open.spotify.com/user/31lkpmm6zw343lzkgz2tf4xpzpm4?si=7d7b100b143e41a6",
        image: "images/spotify.png",
    },
 {
        label: "Steam",
        url: "https://steamcommunity.com/id/originalmyz/",
        image: "images/steam.png",
    },
]

const elements = document.querySelector('.elements');
links.forEach(link => {
    const element = document.createElement('a');
    element.href = link.url;
    element.classList.add('element');
    element.style.backgroundImage = `url(${link.image})`;
    element.innerHTML = `
        <h2>${link.label}</h2>
        ${link.optional_descriptionElement || ''}
    `;

    elements.appendChild(element);
});

async function fetchAndDisplayImage() {
    try {
        const response = await fetch('https://decor.fieryflames.dev/api/users?ids=%5B%22' + userId + '%22%5D');
        const data = await response.json();

        const imageId = data[userId];
        const imageUrl = `https://ugc.decor.fieryflames.dev/${imageId}.png`;

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Fetched Image';

        if (imageId !== null){
            document.getElementById('profilePicture').appendChild(img);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

let theme = localStorage.getItem('theme');
if (theme) {
    setTheme(theme);
} else {
    setTheme('dark');
}

function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
}

function setTheme(newTheme) {
    document.documentElement.setAttribute('theme', newTheme);
    localStorage.setItem('theme', newTheme);
    theme = newTheme;

    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    themeSwitch.setAttribute('title', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
    themeSwitch.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
    themeSwitch.addEventListener('click', toggleTheme);
}

const API_URL = "https://usrbg.is-hardly.online/users";

async function fetchUserData() {
    const res = await fetch(API_URL);
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("Failed to fetch user data");
    }
}

function getImageUrl(data, userId) {
    if (!data.users[userId]) return null;

    const { endpoint, bucket, prefix, users: { [userId]: etag } } = data;
    return `${endpoint}/${bucket}/${prefix}${userId}?${etag}`;
}

async function displayUserBanner() {
    try {
        const data = await fetchUserData();
        const imageUrl = getImageUrl(data, userId);
        if (imageUrl) {
            document.getElementById("user-banner").src = imageUrl;
        } else {
            console.error("User does not have a background image");
        }
    } catch (error) {
        console.error("Error fetching or displaying user banner:", error);
    }
}

displayUserBanner().then(() => console.log("User banner successfully fetched and displayed."));

const API_URL2 = "https://discordlookup.mesalytic.moe/v1/user/";

async function fetchUserAvatar() {
    try {
        const res = await fetch(API_URL2 + userId);
        if (!res.ok) {
            throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching user avatar:", error);
    }
}

async function displayUserAvatar() {
    try {
        const data = await fetchUserAvatar();
        const imageUrl = data.avatar.link;
        const img = document.getElementById("profilePicture");
        img.style.backgroundImage = `url(${imageUrl})`;

        if (data.avatar_decoration) {
            const decoration = document.createElement("img");
            //https://cdn.discordapp.com/avatar-decoration-presets/%asset%.png?size=160&passthrough=true
            const asset = data.avatar_decoration.asset;
            decoration.src = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=160&passthrough=true`;
            decoration.alt = "Avatar Decoration";
            img.appendChild(decoration);
        }else {
            fetchAndDisplayImage().then(r => console.log('Profile picture successfully fetched.'));
        }
    } catch (error) {
        console.error("Error fetching or displaying user avatar:", error);
    }
}

displayUserAvatar().then(() => console.log("User avatar successfully fetched and displayed."));

const toggleChat = document.getElementById('toggle-chat');
const overlay = document.getElementById('overlay');

overlay.style.display = 'none';

toggleChat.addEventListener('click', () => {
    if (overlay.style.display === 'none') {
        overlay.style.display = 'block';
    } else {
        overlay.style.display = 'none';
    }
});