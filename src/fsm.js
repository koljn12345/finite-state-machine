class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config=config;
        this.historyState =[this.config.initial];
        this.historyUndo=[];
    }

    /**
     * Returns active state. 
     * @returns {String}
     */
    getState() {
        return this.historyState[this.historyState.length-1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this.config.states) {
            if(this.historyState[this.historyState.length-1]!=state)
            this.historyState.push(state);
        }
        else 
            throw new Error("");
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {        
        let currentState=this.getState();
        let checkEvent;
        if(checkEvent=this.config.states[currentState].transitions[event])
            this.historyState.push(checkEvent);
        else 
            throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.historyState.push(this.config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(!event) {
            return Object.keys(this.config.states);
        }
        let resultStates=[];
        for(let key in this.config.states) {
            if(event in this.config.states[key].transitions) 
            resultStates.push(key);
        }
        return resultStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.historyState[0]=='normal' && !this.historyState[1])  return false
        if(this.historyUndo[this.historyUndo.length-1]!=this.historyState[this.historyState.length-1])
        this.historyUndo.push(this.historyState.pop());
        else this.historyState.pop();    
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(!this.historyUndo.length) return false;
        this.changeState(this.historyUndo.pop());
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.historyState.length=1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
