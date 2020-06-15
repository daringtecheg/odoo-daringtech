odoo.define('mail/static/src/components/activity_mark_done_popover/activity_mark_done_popover.js', function (require) {
'use strict';

const useStore = require('mail/static/src/component_hooks/use_store/use_store.js');

const { Component } = owl;
const { useRef } = owl.hooks;

class ActivityMarkDonePopover extends Component {

    /**
     * @override
     */
    constructor(...args) {
        super(...args);
        useStore(props => {
            const activity = this.env.models['mail.activity'].get(props.activityLocalId);
            return {
                activity: activity ? activity.__state : undefined,
            };
        });
        this._feedbackTextareaRef = useRef('feedbackTextarea');
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * @returns {mail.activity}
     */
    get activity() {
        return this.env.models['mail.activity'].get(this.props.activityLocalId);
    }

    /**
     * @returns {string}
     */
    get DONE_AND_SCHEDULE_NEXT() {
        return this.env._t("Done & Schedule Next");
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    _onClickDiscard() {
        this.trigger('o-popover-close');
    }

    /**
     * @private
     */
    _onClickDone() {
        this.activity.markAsDone({
            feedback: this._feedbackTextareaRef.el.value,
        });
    }

    /**
     * @private
     */
    _onClickDoneAndScheduleNext() {
        this.activity.markAsDoneAndScheduleNext({
            feedback: this._feedbackTextareaRef.el.value,
        });
    }

}

Object.assign(ActivityMarkDonePopover, {
    props: {
        activityLocalId: String,
    },
    template: 'mail.ActivityMarkDonePopover',
});

return ActivityMarkDonePopover;

});
