import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { Children } from 'react'

export interface ActiveLinkProps extends LinkProps {
  children: any,
  activeClassName?: string,
  className?: string
}

const ActiveLink = ({ children, activeClassName, ...props }: ActiveLinkProps) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink;