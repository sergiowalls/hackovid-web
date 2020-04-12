import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'

import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'
import { courses, Filters, INestedMenuEntry } from '../../../model/Filters'
import { LearningUnit } from '../../../model/LearningUnit'

import './ClassFilters.scss'
import { Checkbox, CheckedState } from '../../atoms/Checkbox/Checkbox'

interface INestedEntryState {
  name: string
  id: string
  checked: CheckedState
  isLearningUnit: boolean
  subentries?: INestedEntryState[]
}

interface NestedMenuEntryProps {
  entry: INestedEntryState
  onClick: (name: string) => void
  hideCheckboxes: boolean
}

const NestedMenuEntry = ({ entry, onClick, hideCheckboxes }: NestedMenuEntryProps) => {
  return (
    <div className="nested-menu-entry">
      {entry.isLearningUnit &&
        <>
          {hideCheckboxes &&
            <div className="nested-menu-entry__name clickable" onClick={() => onClick(entry.id)}>{entry.name}</div>
          }
          {!hideCheckboxes &&
            <Checkbox
              checked={entry.checked}
              label={entry.name}
              onClick={() => onClick(entry.id)}
              className="nested-menu-entry__name clickable"
            />
          }
        </>
      }
      {!entry.isLearningUnit &&
        <div className="nested-menu-entry__name">{entry.name}</div>
      }
      {entry.subentries &&
        <div className="nested-menu-entry__subentries">
          {entry.subentries.map(subentry => <NestedMenuEntry key={subentry.id} entry={subentry} onClick={onClick} hideCheckboxes={hideCheckboxes} />)}
        </div>
      }
    </div>
  )
}

interface ClassFiltersProps {
  onChange?: (filters: Filters) => void
  onlyClickOne: boolean
  onClickOne?: (learningUnit: LearningUnit) => void
}

const ClassFilters = ({ onChange, onClickOne, onlyClickOne }: ClassFiltersProps) => {
  const { learning: { learningUnits } } = useStoreon<State, Events>('learning')

  const [ entries , setEntries ] = useState<INestedEntryState[]>([])

  const getFilteredUnits = (currentEntries: INestedEntryState[]): LearningUnit[] => {
    let result: LearningUnit[] = []

    currentEntries.forEach((currentEntry) => {
      if (currentEntry.isLearningUnit && currentEntry.checked === CheckedState.Checked) {
        const id = parseInt(currentEntry.id.substring(currentEntry.id.lastIndexOf(".") + 1))
        const learningUnit = learningUnits.find((learningUnit) => learningUnit.id === id)
        if (learningUnit) {
          result.push(learningUnit)
        }
      } else if (currentEntry.subentries) {
        result = [...result, ...getFilteredUnits(currentEntry.subentries)]
      }
    })

    return result
  }

  useEffect(() => {
    const filteredUnits = getFilteredUnits(entries)
    if (onChange) {
      onChange(new Filters(filteredUnits))
    }
  }, [entries])

  const getLearningUnitsFor = (learningUnits: LearningUnit[], prefixId: string, parent?: string, superParent?: string): INestedEntryState[] => {
    return learningUnits.filter(learningUnit =>
      learningUnit.course === superParent && learningUnit.subject === parent
    ).map((learningUnit) => ({
      name: learningUnit.title,
      checked: CheckedState.Unchecked,
      id: `${prefixId}.learningunit.${learningUnit.id}`,
      isLearningUnit: true
    }))
  }

  const getNestedEntryCopy = (nestedEntry: INestedMenuEntry, id: string, parent?: string): INestedEntryState => {
    const filteredUnits = getLearningUnitsFor(learningUnits, id, nestedEntry.name, parent)

    const subentries = nestedEntry.subentries !== undefined
      ? nestedEntry.subentries.map((entry, index) =>
        getNestedEntryCopy(entry, `${id}.node.${index}`, nestedEntry.name)
      )
      : (filteredUnits ? filteredUnits : undefined)

    return {
      name: nestedEntry.name,
      checked: CheckedState.Unchecked,
      id,
      subentries,
      isLearningUnit: false
    }
  }

  useEffect(() => {
    const newEntries = courses.map((entry, index) =>
      getNestedEntryCopy(entry, `root.${index}`)
    )
    setEntries(newEntries)
  }, [])

  const isFullyChecked = (entry: INestedEntryState): boolean => {
    if (!entry.subentries) return entry.checked === CheckedState.Checked

    return entry.subentries.map(isFullyChecked).filter(b => !b).length === 0
  }

  const modifyState = (currentEntry: INestedEntryState, id: string): INestedEntryState => {
    let result: INestedEntryState = {
      ...currentEntry
    }

    if (currentEntry.id === id) {
      result.checked = currentEntry.checked !== CheckedState.Checked
        ? CheckedState.Checked
        : CheckedState.Unchecked
    }

    result.subentries = currentEntry.subentries
      ? currentEntry.subentries.map(entry => modifyState(entry, id))
      : undefined
    //
    // result.checked = (result.subentries !== undefined && result.subentries.length > 0)
    //   ? (result.subentries.map(isFullyChecked).filter(b => !b).length === 0 ? CheckedState.Checked : CheckedState.Unchecked)
    //   : (() => {
    //     return result.checked
    //   })()

    return result
  }

  const handleOnClick = (id: string) => {
    if (onlyClickOne && onClickOne) {
      const learningUnitId = parseInt(id.substring(id.lastIndexOf(".") + 1))
      const learningUnit = learningUnits.filter(l => l.id === learningUnitId)[0]
      if (learningUnit) {
        onClickOne(learningUnit)
      }
    } else {
      const newEntries = entries.map(entry => modifyState(entry, id))

      setEntries(newEntries)
    }
  }

  return (
    <div className="class-filters">
      {entries.map(entry => <NestedMenuEntry key={entry.id} entry={entry} onClick={handleOnClick} hideCheckboxes={onlyClickOne} />)}
    </div>
  )
}

export { ClassFilters }
