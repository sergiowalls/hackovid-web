import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'
import { Checkbox } from '@blueprintjs/core'

import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'
import { courses, INestedMenuEntry } from '../../../model/Filters'
import { LearningUnit } from '../../../model/LearningUnit'

import './ClassFilters.scss'

enum CheckedState {
  Checked,
  Half,
  Unchecked
}

interface INestedEntryState {
  name: string
  id: string
  checked: CheckedState
  subentries?: INestedEntryState[]
}

interface NestedMenuEntryProps {
  entry: INestedEntryState
  onClick: (name: string) => void
}

const NestedMenuEntry = ({ entry, onClick }: NestedMenuEntryProps) => {
  if (entry.checked === CheckedState.Checked) console.log(`Checked: ${entry.id}`)
  if (entry.checked === CheckedState.Half) console.log(`Half: ${entry.id}`)
  return (
    <div className="nested-menu-entry">
      <Checkbox
        checked={entry.checked === CheckedState.Checked}
        indeterminate={entry.checked === CheckedState.Half}
        label={entry.name}
        onClick={() => onClick(entry.id)}
        className="nested-menu-entry__name"
      />
      {entry.subentries &&
        <div className="nested-menu-entry__subentries">
          {entry.subentries.map(subentry => <NestedMenuEntry key={subentry.id} entry={subentry} onClick={onClick} />)}
        </div>
      }
    </div>
  )
}

const ClassFilters = () => {
  const { learning: { learningUnits } } = useStoreon<State, Events>('learning')

  const [ entries , setEntries ] = useState<INestedEntryState[]>([])

  const getLearningUnitsFor = (learningUnits: LearningUnit[], prefixId: string, parent?: string, superParent?: string): INestedEntryState[] => {
    return learningUnits.filter(learningUnit =>
      learningUnit.course === superParent && learningUnit.subject === parent
    ).map((learningUnit) => ({
      name: learningUnit.title,
      checked: CheckedState.Unchecked,
      id: `${prefixId}.learningunit.${learningUnit.id}`
    }))
  }

  const getNestedEntryCopy = (nestedEntry: INestedMenuEntry, id: string, parent?: string): INestedEntryState => {
    const filteredUnits = getLearningUnitsFor(learningUnits, id, nestedEntry.name, parent)

    const subentries = nestedEntry.subentries
      ? nestedEntry.subentries.map((entry, index) =>
        getNestedEntryCopy(entry, `${id}.node.${index}`, nestedEntry.name)
      )
      : (filteredUnits ? filteredUnits : undefined)

    return {
      name: nestedEntry.name,
      checked: CheckedState.Unchecked,
      id,
      subentries
    }
  }

  useEffect(() => {
    const newEntries = courses.map((entry, index) =>
      getNestedEntryCopy(entry, `root.${index}`)
    )
    setEntries(newEntries)
  }, [])

  const modifyState = (currentEntry: INestedEntryState, id: string): INestedEntryState => {
    let result: INestedEntryState = {
      ...currentEntry
    }

    if (currentEntry.id === id) {
      console.log("entry found")
      result.checked = currentEntry.checked !== CheckedState.Checked
        ? CheckedState.Checked
        : CheckedState.Unchecked
    }

    result.subentries = currentEntry.subentries
      ? currentEntry.subentries.map(entry => modifyState(entry, id))
      : undefined

    return result
  }

  const handleOnClick = (id: string) => {
    const newEntries = entries.map(entry => modifyState(entry, id))

    console.log(newEntries)

    setEntries(newEntries)
  }

  return (
    <div className="class-filters">
      {entries.map(entry => <NestedMenuEntry key={entry.id} entry={entry} onClick={handleOnClick} />)}
    </div>
  )
}

export { ClassFilters }
