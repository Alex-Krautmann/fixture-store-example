define(['jquery', 'can', 'can/util/fixture'],
    function($, can) {
        var NUM_IN_STORE = 10;
        var thingStore = can.fixture.store(NUM_IN_STORE, function(i) {
            return {
                id: i,
                name: "thing" + i
            }
        });

        var thingFix = can.fixture({
            'GET /services/things/{id}': thingStore.findOne
        });
        var Thing = can.Model.extend({
            findOne: 'GET /services/things/{id}'
        }, {});
        return can.Control.extend({
            defaults: {
                'listToShow': new can.List([]),
                'numTotal': NUM_IN_STORE,
                'numShown': can.compute(0)
            }
        }, {
            init: function(element, options) {
                var self = this;
                //this.options.listToShow.attr('0', {name:'Alex'});
                this.element.append(can.view('thingMustache', {
                    'thingList': self.options.listToShow,
                    'numTotal': self.options.numTotal,
                    'numShown': self.options.numShown
                }));
                // setup bind to increment numShown
                this.options.listToShow.bind('add', function() {
                    self.options.numShown(self.options.numShown() + 1);
                });
            },
            'button click': function(el, evt) {
                evt.preventDefault(); // needed?
                el.attr('disabled', 'disabled');
                var self = this;

                Thing.findOne({
                    id: self.options.numShown()
                }, function(thing) {
                    if (thing) {
                        // IF here, it means the fixture store found the item and returns it as expected
                        self.options.listToShow.push(thing);
                    } else {
                        // IF here, it means the fixture did not find the item, and returns undefined
                        var bugStr = "Should have responded with some appropriate http error code: got " + typeof thing + " object";
                        self.options.listToShow.push({
                            name: bugStr
                        });
                    }
                    el.removeAttr('disabled');
                });
            }
        });
    });
