const vars = {
  logging: {
    label: "Logging",
    default: false,
    description: "Logging things extension doing in console"
  },
  nosponsored: {
    label: "No 'Sponsored video'",
    default: false,
    description: "Removes YouTube videos with 'Only for sponsors' from recommendations (Unstable)"
  },
  nosleeptimer: {
    label: "No 'Sleep timer'",
    default: true,
    description: "Removes sleep timer from YouTube video settings"
  },
  nourltracking: {
    label: "No url tracking",
    default: true,
    description: "Removes ?si tracking parameter from YouTube copied urls"
  },
  autoconfirm: {
    label: "No 'Continue watching?'",
    default: true,
    description: "Removes YouTube function that randomly stops video"
  },
  youtubered: {
    label: "Return Youtube Red",
    default: true,
    description: "Colors progress bars and interface elements with YouTube's red color"
  },
  fixHeader: {
    label: "Fix Youtube headers",
    default: true,
    description: "Removes blur and background from YouTube's header"
  },
  hideRightArrow: {
    label: "Hide Right Navigation Arrow",
    default: true,
    description: "Removes the right navigation arrow"
  },
  hideTeaserCarousel: {
    label: "Hide Teaser Carousel",
    default: true,
    description: "Removes the premiere chat icon teaser carousel"
  },
  hideGamesShelf: {
    label: "Hide Games Shelf",
    default: true,
    description: "Removes the games block on YouTube"
  },
  hideSponsorPopup: {
    label: "Hide Sponsor This Channel Popup",
    default: true,
    description: "Removes the 'Sponsor this channel' popup"
  },
  hideSecondChannelIcon: {
    label: "Hide Second Channel Icon",
    default: true,
    description: "Removes the second channel icon in video descriptions"
  },
  hideShortsShelf: {
    label: "Hide Shorts Shelf",
    default: true,
    description: "Removes Shorts section from descriptions and other places"
  },
  hideStillWatchingPopup: {
    label: "Hide 'Still watching?' Popup",
    default: true,
    description: "Removes the 'Still watching?' YouTube popup"
  },
  transparentSearchBox: {
    label: "Transparent Search Box",
    default: true,
    description: "Makes the search background transparent instead of grey"
  },
  hideVoiceSearchButton: {
    label: "Hide Voice Search Button",
    default: true,
    description: "Removes the voice search button in the header"
  },
  hideYoutubeSurveys: {
    label: "Hide YouTube Surveys",
    default: true,
    description: "Removes pop-up surveys and dialogs (How do you like this video?)"
  },
  hideHorizontalScrollbar: {
    label: "Hide Horizontal Scrollbar",
    default: true,
    description: "Removes horizontal scrollbar on the page"
  },
  fixMainGrid: {
    label: "Fix Main Page Grid",
    default: true,
    description: "Sets 5 items per row on YouTube's main page"
  },
  hideClarifyBox: {
    label: "Hide 'Clarify Box'",
    default: true,
    description: 'Removes propaganda (<a href="https://support.google.com/youtube/answer/9004474" target="_blank" rel="noopener noreferrer">support.google.com</a>)'
  },
  hideLoadingMocking: {
    label: "Hide 'Video is not loading?' Message",
    default: true,
    description: 'Removes mocking from hindus youtube devs \'Video is not loading?\' (<a href="https://www.reddit.com/r/youtube/comments/1lafhcc/youtube_is_now_artificially_slowing_down_youtube/" target="_blank" rel="noopener noreferrer">reddit.com</a>)'
  },
  hideYoutubeSelfPromotions: {
    label: "Hide YouTube Self Promotions",
    default: true,
    description: "Hides self promotions from YouTube such as YouTube Music and YouTube Premium"
  },
  clearVideoDescription: {
    label: "Clear Video Description",
    default: true,
    description: "Removes people mentioned, AI generated mark, event tickets, and transcripts from video description"
  },
  hideUselessThings: {
    label: "Hide useless things",
    default: true,
    description: "Hides useless elements as copyright notifications etc."
  }

};

const cssRules = {

  youtubered: `
  .ytp-play-progress,
  #progress,
  .ytd-thumbnail-overlay-resume-playback-renderer#progress,
  .YtThumbnailOverlayProgressBarHostWatchedProgressBarSegmentModern,
  .YtChapteredProgressBarChapteredPlayerBarChapterRefresh,
  .YtChapteredProgressBarChapteredPlayerBarFillRefresh,
  .YtProgressBarLineProgressBarPlayedRefresh,
  #progress.yt-page-navigation-progress {
      background: var(--yt-spec-static-brand-red) !important;
  }

  .yt-icon-shape > div > svg > g:first-of-type > path:first-of-type {
      fill: var(--yt-spec-static-brand-red) !important;
  }
  `,

  fixHeader: `
    ytd-masthead {
        background: var(--yt-spec-base-background) !important;
    }

    #header.style-scope.ytd-rich-grid-renderer {
        display: none !important;
    }

    #frosted-glass.loading-with-chipbar,
    #frosted-glass.with-chipbar.ytd-app {
        background: transparent !important;
        backdrop-filter: none !important;
    }

    .yt-spec-icon-badge-shape--type-notification-refresh .yt-spec-icon-badge-shape__badge {
        background-color: red !important;
        color: white !important;
    }
  `,

  hideRightArrow: `
    #right-arrow-container {
        display: none !important;
    }
  `,

  hideTeaserCarousel: `
    #teaser-carousel {
        display: none !important;
    }
  `,

  hideGamesShelf: `
    .ytd-rich-shelf-renderer {
        display: none !important;
    }
  `,

  hideSponsorPopup: `
    yt-mealbar-promo-renderer {
        display: none !important;
    }
  `,

  hideSecondChannelIcon: `
    ytd-video-description-infocards-section-renderer a#header {
        display: none !important;
    }
  `,

  hideShortsShelf: `
    ytd-reel-shelf-renderer {
        display: none !important;
    }
  `,

  hideStillWatchingPopup: `
    tp-yt-paper-toast#toast {
        display: none !important;
    }
  `,

  transparentSearchBox: `
    .ytSearchboxComponentSearchButtonDark,
    .ytSearchboxComponentInputBox {
        background-color: transparent !important;
    }
  `,

  hideVoiceSearchButton: `
    #voice-search-button.ytd-masthead {
        display: none !important;
    }
  `,

  hideYoutubeSurveys: `
    #tp-yt-paper-dialog.style-scope.ytd-popup-container,
    ytd-single-option-survey-renderer,
    ytd-inline-survey-renderer,
    ytd-checkbox-survey-renderer {
        display: none !important;
    }
  `,

  hideHorizontalScrollbar: `
    html, body {
        overflow-x: hidden !important;
    }
  `,

  fixMainGrid: `
    ytd-browse:is([page-subtype="home"], [page-subtype="subscriptions"]) ytd-rich-grid-renderer {
        --ytd-rich-grid-items-per-row: 5 !important;
        --ytd-rich-grid-posts-per-row: 5 !important;
        --ytd-rich-grid-row-margin: 16px !important;
        --ytd-rich-grid-item-margin: 16px !important;
    }
  `,

  hideClarifyBox: `
    #clarify-box {
        display: none !important;
    }
  `,

  hideLoadingMocking: `
    #text-container.style-scope.yt-notification-action-renderer {
        display: none !important;
    }
  `,
  
  hideYoutubeSelfPromotions: `
    #statement-banner-content.style-scope.ytd-statement-banner-renderer {
        display: none !important;
    }
  `,

  clearVideoDescription: `
    yt-video-attributes-section-view-model,
    how-this-was-made-section-view-model,
    .YtwHowThisWasMadeSectionViewModelHost,
    #ticket-shelf,
    ytd-video-description-transcript-section-renderer {
      display: none !important;
    }
  `,
  
  hideUselessThings: `
    #footer:has(#guide-links-primary) {
      display: none !important;
    }
  `
};
