// Require necessary NPM packages
const express = require('express');

// Require Mongoose Model for Feed
const Feed = require("../models/feed");
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();


/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /api/feeds
 * Description:   Get All Feeds
 */
router.get('/api/feeds', (req, res) => {
  Feed.find()
  // Return all Feeds as an Array
  .then((allfeeds) => {
    res.status(200).json({ feeds: allfeeds});
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

/**
* Action:       CREATE
* Method:       POST
* URI:          /api//AddFeed
* Description:  Create new feed
*/

router.post("/api/AddFeed", (req, res) => {
  Feed.create(req.body.feed)
    // On a successful `create` action, respond with 201
    // HTTP status and the content of the new feed.
    .then(newFeed => {
      res.status(201).json({ feed: newFeed });
    })
    // Catch any errors that might occur
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

/**
 * Action:        SHOW
 * Method:        GET
 * URI:           /api/feeds/5e7098c41f25f74ace1469cb
 * Description:   Get An Feed by Feed ID
 */
router.get('/api/feeds/:id', (req, res) => {
  Feed.findById(req.params.id)
  .then((feed) => {
    if (feed) {
      res.status(200).json({ feed: feed });
    } else {
      // If we couldn't find a document with the matching ID
      res.status(404).json({
        error: {
          name: 'DocumentNotFoundError',
          message: 'The provided ID doesn\'t match any documents'
        }
      });
    }
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  })
});



/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/feeds/5e6b775079d88c247a7ae76a
 * Description: Update Feed by Feed ID
 */
router.patch('/api/feeds/:id', (req, res) => {
  Feed.findById(req.params.id)
    .then((feed) => {
      if(feed) {
        // Pass the result of Mongoose's `.update` method to the next `.then`
        return feed.update(req.body.feed);
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
          }
        });
      }
    })
    .then(() => {
      // If the update succeeded, return 204 and no JSON
      res.status(204).end();
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

/**
* Action:       DESTROY
* Method:       DELETE
* URI:          /api/feeds/5e6b787379d88c247a7ae76c
* Description:  Delete Feed by Feed ID
*/
router.delete('/api/feeds/:id', (req, res) => {
  Feed.findById(req.params.id)
  .then((feed) => {
    if (feed) {
      // Pass the result of Mongoose's `.delete` method to the next `.then`
      return feed.remove();
    } else {
      // If we couldn't find a document with the matching ID
      res.status(404).json({
        error: {
          name: 'DocumentNotFoundError',
          message: 'The provided ID Doesn\'t match any documents'
        }
      });
    }
  })
  .then(() => {
    // If the deletion succeeded, return 204 and no JSON
    res.status(204).end();
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

// Export the Router so we can use it in the server.js file
module.exports = router;