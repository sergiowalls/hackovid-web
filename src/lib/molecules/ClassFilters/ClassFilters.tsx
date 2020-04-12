import React from 'react'
import { useStoreon } from 'storeon/react'
import { Checkbox } from '@blueprintjs/core'

import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'
import { courses, INestedMenuEntry } from '../../../model/Filters'

import './ClassFilters.scss'

interface NestedMenuEntryProps {
  entry: INestedMenuEntry
  depth: number
}

const NestedMenuEntry = ({ entry, depth }: NestedMenuEntryProps) => {
  return (
    <div className="nested-menu-entry">
      <Checkbox
        checked={true}
        label={entry.name}
        onChange={() => {}}
        className={`nested-menu-entry__name depth-${depth}`}
      />
      {entry.subentries &&
        <div className="nested-menu-entry__subentries">
          {entry.subentries.map(subentry => <NestedMenuEntry entry={subentry} depth={depth} />)}
        </div>
      }
    </div>
  )
}

const ClassFilters = () => {
  const { learning: { learningUnits } } = useStoreon<State, Events>('learning')

  const getLearningUnitsFor = (parent?: string, superParent?: string): INestedMenuEntry[] => {
    return learningUnits.filter(learningUnit =>
      learningUnit.course === superParent && learningUnit.subject === parent
    ).map(learningUnit => ({
      name: learningUnit.title
    }))
  }

  const getNestedEntryCopy = (nestedEntry: INestedMenuEntry, parent?: string): INestedMenuEntry => {
    const learningUnits = getLearningUnitsFor(nestedEntry.name, parent)

    const subentries = nestedEntry.subentries
      ? nestedEntry.subentries.map(entry => getNestedEntryCopy(entry, nestedEntry.name))
      : (learningUnits ? learningUnits : undefined)

    return {
      name: nestedEntry.name,
      subentries
    }
  }

  const entries = courses.map(entry => getNestedEntryCopy(entry))

  return (
    <div className="class-filters">
      {entries.map(entry => <NestedMenuEntry entry={entry} depth={0} />)}
    </div>
  )
}

export { ClassFilters }
