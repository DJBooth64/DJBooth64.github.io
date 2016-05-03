# DJBooth64.github.io

README: Here we will describe our project submission and the individual pieces.  The submission will come in one zip file, 
containing multiple pieces, which we describe here:

1. Site: This folder contains all the code used in our site.  The code is appropriately organized, with 5 html files corresponding to
   the 5 main pages on the site and different folders for different code.  These include:
   - css, where the stylesheets are stored
   - data, where the data is kept
   - design (an artefact of previous designs - no necessary info here)
   - fonts, all the font specification files
   - img, where an image file is kept for the menu bar
   - js, containing all of our javascript code for the site
   - libs, containing useful libraries like d3, jQuery, etc.

2. Data: Although the data is included in the site code as a separate folder, we have uploaded it separately as well for convenience.
   Here, you will find the data for property values in 2014 and 2015, as well as a file called assorted_dataset.csv which is a preprocessed
   version of the 2015 data used for the map visualization.

3. Process Book - This is just a PDF of our process book for the site.

4. Links: In this document, you can find links to our website and screencast video.  We include them here as well:
   - Website: DJBooth64.github.io/index.html
   - Video:
   
5. README: This readme file.

6. Pictures of our assignments from the project presentations from last week.

Additionally, we explain some of the features of the site here as well.  The visualizations on the Research page are explained there, 
and the process book can be found on the Process tab.  Most of the magic happens on the homepage.
   - On the homepage, you can find a map with properties labeled with circles.  By choosing filtering options, you can make the size
     of the circles represent the total area of the property (in square feet) or have the hue of the circle represent the value of the
     property (with darker circles representing more valuable properties
   - By clicking on any of the circles, you have the option to see statistics on that property.  Clicking this will bring up a section
     explaining some more descriptive information about that property.
   - The other function which can be performed on the homepage is modeling investment in property bundles by allowing you to select
     multiple properties at once and view their collective value.  After clicking on a property, you have the option to add it to 
     Bundle One or Bundle Two.  At any point after adding a property (or multiple), you can click View Bundles to view a visualization
     of the properties in these bundles as well as their relative value.  These visualizations are interactive, so you can continue
     to add properties and watch the visualizations update.
   - To reset the bundles, simply click Clear Bundles and both bundles reset, allowing you to choose different properties.
   - Finally, the menu button at the top right brings up the navbar on the right, the X closes the navbar, and clicking Enlarge or
     Shrink will change the size of the navbar.
