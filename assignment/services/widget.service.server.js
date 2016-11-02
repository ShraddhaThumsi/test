/**
 * Created by shraddha on 10/27/16.
 */
module.exports = function(app)
{
    var widgets =
        [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<h3><span class="mw-headline" ' +
            'id="Sale_of_headquarters_and_relocation_to_Jersey_City">' +
            'Sale of headquarters and relocation to Jersey City</span><span class="mw-editsection">' +
            '<span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=Forbes&amp;action=edit&amp;' +
            'section=2" title="Edit section: Sale of headquarters and relocation to Jersey City">edit</a><span ' +
            'class="mw-editsection-bracket">]</span></span></h3>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
}