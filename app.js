$(document).ready(function() {
  //Select Already Existing Elements
  var $app = $('#app');
  $app.html('');

  //Create New HTML Elements

  //Main Elements
  var $title = $('<h1>TWIDDLER</h1>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $tweetFeed = $('<div id="feed"></div>');
  var $friendsBox = $('<div id="friends-home">Friends List</div>');
  var $friendsList = $('<ul id="friends"></ul>');
  var $friend = $('<li class="friend"></li>');
  var $tweet = $('<div class="tweet"></div>');

  //Icons
  var $likeIcon = $('<i class="fa-regular fa-heart like icon"></i>');
  var $shareIcon = $('<i class="fa-solid fa-share share icon"></i>');
  var $commentIcon = $('<i class="fa-regular fa-comment comment icon"></i>');
  var $retweetIcon = $('<i class="fa-duotone fa-retweet retweet icon"></i>');
  var $iconContainer = $('<div class="icon-container"</div>');

  //Tweet Section
  var $profilePhoto = $('<img class="profile-photo"></img>');
  var $username = $('<span class="username"></span>');
  var $message = $('<p class="message"></p>');
  var $timestamp = $('<span class="timestamp"></span>');

  //Helper Function
  var renderFeed = function(user) {
    $('#feed').html('');

    if (user) {
      var tweetIndex = streams.users[user].length - 1;
      var tweet = streams.users[user];
    } else {
      var tweetIndex = streams.home.length - 1;
      var tweet = streams.home;
    }
    while (tweetIndex >= 0) {
      var currentTweet = tweet[tweetIndex];
      $profilePhoto.attr('src', currentTweet.profilePhotoURL);
      $username.text('@' + currentTweet.user);
      $timestamp.text(' ' + jQuery.timeago(currentTweet.createdAt));
      $message.text(currentTweet.message);

      //Create tweet UI of current tweet
      $iconContainer.append($likeIcon, $shareIcon, $commentIcon, $retweetIcon);
      $tweet.append($profilePhoto, $username, $timestamp, $message, $iconContainer);

      $tweet.clone().appendTo($tweetFeed);
      tweetIndex --;
    }
  };

  //Create Friends List
  var createList = function(users) {
    for (var key in users) {
      $friend.text('@' + key.toString());
      $friend.clone().appendTo($friendsList);
    }
  };
  createList(streams.users);
  $friendsList.appendTo($friendsBox);

//Create Event Handler Functions
  var handleUsernameClick = function() {
    if ($updateButton.text() === 'Update Feed') {
      $updateButton.text('Back');
    }
    var user = $(this).text().substring(1);
    renderFeed(user);
  };

  //Set Event Listeners
  $('#app').on('click', '#update-feed', function() {
    if ($updateButton.text() === 'Back') {
      $updateButton.text('Update Feed');
    }
    renderFeed();
  });

  $('#app').on('click', '.username', handleUsernameClick);
  $('#app').on('click', '.friend', handleUsernameClick);


//Append new HTML elements to the DOM

  $title.appendTo($app);
  $updateButton.appendTo($app);
  $friendsBox.appendTo($app);
  $tweetFeed.appendTo($app);
  renderFeed();

});
window.isItBeautifulYet = true;